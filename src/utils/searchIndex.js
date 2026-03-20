/**
 * Search Index Utilities
 * Simple inverted index for full-text search across roles and content
 */

/**
 * Tokenize text into searchable terms
 * Converts to lowercase and splits on word boundaries
 *
 * @param {string} text - The text to tokenize
 * @returns {Array<string>} Array of normalized tokens
 */
function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .split(/\s+/) // Split on whitespace
    .filter(token => token.length > 2); // Filter out very short tokens
}

/**
 * Remove common stop words from token list
 *
 * @param {Array<string>} tokens - Array of tokens
 * @returns {Array<string>} Filtered tokens
 */
function filterStopWords(tokens) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'can', 'may', 'might', 'must', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'some', 'any', 'no', 'nor', 'not', 'only', 'same',
    'so', 'than', 'too', 'very', 'just'
  ]);

  return tokens.filter(token => !stopWords.has(token));
}

/**
 * Calculate Levenshtein distance for fuzzy matching
 * Allows matching misspelled search terms
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Edit distance
 */
function levenshteinDistance(str1, str2) {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return track[str2.length][str1.length];
}

/**
 * Build a search index from roles and their markdown content
 * Creates an inverted index for full-text search
 *
 * @param {Array<object>} roles - Array of role objects with {id, name, overview}
 * @param {object} markdownContent - Object mapping roleId.level to markdown strings
 * @returns {object} Search index object with {tokens, documents, metadata}
 */
export function buildSearchIndex(roles, markdownContent = {}) {
  const index = {
    tokens: {},
    documents: [],
    metadata: {}
  };

  if (!roles || !Array.isArray(roles)) {
    return index;
  }

  roles.forEach((role, roleIdx) => {
    const roleId = role.id;
    const roleName = role.name || roleId;

    // Index role overview
    const overviewTokens = tokenize(role.overview || '');
    const filteredOverviewTokens = filterStopWords(overviewTokens);

    filteredOverviewTokens.forEach(token => {
      if (!index.tokens[token]) {
        index.tokens[token] = [];
      }

      index.tokens[token].push({
        docId: roleIdx,
        section: 'overview',
        level: null,
        weight: 10
      });
    });

    // Index level content if provided
    const levels = ['beginner', 'mid', 'senior'];

    levels.forEach(level => {
      const contentKey = `${roleId}.${level}`;
      const markdown = markdownContent[contentKey];

      if (markdown && typeof markdown === 'string') {
        const contentTokens = tokenize(markdown);
        const filteredContentTokens = filterStopWords(contentTokens);

        filteredContentTokens.forEach(token => {
          if (!index.tokens[token]) {
            index.tokens[token] = [];
          }

          index.tokens[token].push({
            docId: roleIdx,
            section: 'content',
            level,
            weight: 5
          });
        });
      }
    });

    // Store document metadata for results
    index.documents.push({
      id: roleIdx,
      roleId,
      roleName,
      overview: role.overview || ''
    });

    index.metadata[roleId] = {
      name: roleName,
      overview: role.overview || ''
    };
  });

  return index;
}

/**
 * Search the index for a query string
 * Returns ranked results with relevance scores
 *
 * @param {string} query - Search query
 * @param {object} index - The search index built by buildSearchIndex
 * @param {object} options - Search options
 * @param {number} options.limit - Max results to return (default: 20)
 * @param {boolean} options.fuzzy - Enable fuzzy matching (default: true)
 * @param {number} options.fuzzyThreshold - Max distance for fuzzy match (default: 2)
 * @returns {Array<object>} Array of results with {roleId, level, section, snippet, score}
 */
export function search(query, index, options = {}) {
  const {
    limit = 20,
    fuzzy = true,
    fuzzyThreshold = 2
  } = options;

  if (!query || typeof query !== 'string' || !index || !index.tokens) {
    return [];
  }

  const queryTokens = tokenize(query);
  const filteredQueryTokens = filterStopWords(queryTokens);

  if (filteredQueryTokens.length === 0) {
    return [];
  }

  // Score each document based on matching tokens
  const scoreMap = {};

  filteredQueryTokens.forEach(queryToken => {
    // Exact match
    if (index.tokens[queryToken]) {
      index.tokens[queryToken].forEach(match => {
        const key = `${match.docId}-${match.level}-${match.section}`;

        if (!scoreMap[key]) {
          scoreMap[key] = {
            docId: match.docId,
            level: match.level,
            section: match.section,
            score: 0,
            matchedTokens: new Set()
          };
        }

        scoreMap[key].score += match.weight * 10;
        scoreMap[key].matchedTokens.add(queryToken);
      });
    }

    // Fuzzy matching
    if (fuzzy) {
      for (const indexToken in index.tokens) {
        const distance = levenshteinDistance(queryToken, indexToken);

        if (distance > 0 && distance <= fuzzyThreshold) {
          index.tokens[indexToken].forEach(match => {
            const key = `${match.docId}-${match.level}-${match.section}`;

            if (!scoreMap[key]) {
              scoreMap[key] = {
                docId: match.docId,
                level: match.level,
                section: match.section,
                score: 0,
                matchedTokens: new Set()
              };
            }

            const fuzzyWeight = match.weight * (10 - distance);
            scoreMap[key].score += fuzzyWeight;
            scoreMap[key].matchedTokens.add(indexToken);
          });
        }
      }
    }
  });

  // Convert to array and sort by score
  const results = Object.values(scoreMap)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(result => {
      const doc = index.documents[result.docId];

      return {
        roleId: doc.roleId,
        roleName: doc.roleName,
        level: result.level,
        section: result.section,
        score: Math.round(result.score),
        matchedTokens: Array.from(result.matchedTokens)
      };
    });

  return results;
}

/**
 * Autocomplete suggestions based on index
 * Returns the most common tokens matching the prefix
 *
 * @param {string} prefix - Prefix to match
 * @param {object} index - The search index
 * @param {number} limit - Max suggestions (default: 10)
 * @returns {Array<string>} Array of suggestions
 */
export function getAutocompleteSuggestions(prefix, index, limit = 10) {
  if (!prefix || typeof prefix !== 'string' || !index || !index.tokens) {
    return [];
  }

  const normalizedPrefix = prefix.toLowerCase();
  const suggestions = new Map();

  // Find tokens that start with the prefix
  for (const token in index.tokens) {
    if (token.startsWith(normalizedPrefix)) {
      const matches = index.tokens[token].length;
      suggestions.set(token, matches);
    }
  }

  // Sort by frequency (number of matches)
  return Array.from(suggestions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(entry => entry[0]);
}

/**
 * Get popular search terms from the index
 * Useful for trending topics or suggestions
 *
 * @param {object} index - The search index
 * @param {number} limit - Max terms (default: 10)
 * @returns {Array<string>} Array of popular terms
 */
export function getPopularTerms(index, limit = 10) {
  if (!index || !index.tokens) {
    return [];
  }

  return Object.entries(index.tokens)
    .map(([token, matches]) => ({
      term: token,
      frequency: matches.length
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit)
    .map(entry => entry.term);
}

/**
 * Search within a specific role or level
 * Filters search results to a particular scope
 *
 * @param {string} query - Search query
 * @param {object} index - The search index
 * @param {string} roleId - Role to limit search to (optional)
 * @param {string} level - Level to limit search to (optional)
 * @returns {Array<object>} Filtered search results
 */
export function searchScoped(query, index, roleId = null, level = null) {
  const results = search(query, index);

  return results.filter(result => {
    if (roleId && result.roleId !== roleId) {
      return false;
    }

    if (level && result.level !== level) {
      return false;
    }

    return true;
  });
}

/**
 * Get related terms for a search term
 * Returns other terms that often appear in the same documents
 *
 * @param {string} term - The search term
 * @param {object} index - The search index
 * @param {number} limit - Max related terms (default: 5)
 * @returns {Array<string>} Array of related terms
 */
export function getRelatedTerms(term, index, limit = 5) {
  if (!term || typeof term !== 'string' || !index || !index.tokens) {
    return [];
  }

  const normalizedTerm = term.toLowerCase().trim();

  if (!index.tokens[normalizedTerm]) {
    return [];
  }

  // Get all documents this term appears in
  const docIds = new Set(index.tokens[normalizedTerm].map(match => match.docId));

  // Find other tokens that appear in the same documents
  const relatedTokens = new Map();

  for (const token in index.tokens) {
    if (token === normalizedTerm) continue;

    const frequency = index.tokens[token].filter(match => docIds.has(match.docId)).length;

    if (frequency > 0) {
      relatedTokens.set(token, frequency);
    }
  }

  // Sort by frequency and return
  return Array.from(relatedTokens.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(entry => entry[0]);
}

/**
 * Clear and rebuild the search index
 * Useful for updating when content changes
 *
 * @param {Array<object>} roles - New roles array
 * @param {object} markdownContent - Updated markdown content
 * @returns {object} Fresh search index
 */
export function rebuildSearchIndex(roles, markdownContent) {
  return buildSearchIndex(roles, markdownContent);
}
