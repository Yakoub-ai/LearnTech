/**
 * Markdown Loader Utilities
 * Functions to parse and extract structured data from markdown content
 */

/**
 * Parse markdown resource table into structured data
 * Extracts rows from markdown tables with columns: Topic, Resource, Type
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<{topic: string, title: string, url: string, type: string}>} Array of resources
 */
export function parseResourceTable(markdown) {
  const resources = [];

  // Match markdown table rows (excluding header and separator)
  // Tables have format: | Topic | [Title](url) | Type |
  const lines = markdown.split('\n');
  let inTable = false;
  let isHeaderRow = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect table start
    if (line.includes('|') && !inTable) {
      inTable = true;
      isHeaderRow = true;
      continue;
    }

    // Detect table separator
    if (inTable && line.includes('---')) {
      isHeaderRow = false;
      continue;
    }

    // End of table
    if (inTable && !line.includes('|')) {
      inTable = false;
      continue;
    }

    // Parse table rows
    if (inTable && !isHeaderRow && line.trim()) {
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);

      if (cells.length >= 3) {
        const topic = cells[0];
        const resourceCell = cells[1];
        const type = cells[2];

        // Extract URL and title from markdown link format [Title](url)
        const linkMatch = resourceCell.match(/\[([^\]]+)\]\(([^)]+)\)/);

        if (linkMatch) {
          resources.push({
            topic,
            title: linkMatch[1],
            url: linkMatch[2],
            type
          });
        } else {
          // Plain text without link
          resources.push({
            topic,
            title: resourceCell,
            url: null,
            type
          });
        }
      }
    }
  }

  return resources;
}

/**
 * Extract learning objectives from markdown
 * Finds section "After completing X you should be able to:" and extracts bullet points
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<string>} Array of learning objectives
 */
export function parseObjectives(markdown) {
  const objectives = [];
  const lines = markdown.split('\n');
  let captureMode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for "After completing" section
    if (line.includes('After completing') && line.includes('should be able to:')) {
      captureMode = true;
      continue;
    }

    // Stop capturing at next heading or horizontal rule
    if (captureMode && (line.startsWith('#') || line.includes('---'))) {
      break;
    }

    // Capture bullet points
    if (captureMode && line.trim().startsWith('-')) {
      const objective = line.trim().substring(2).trim(); // Remove '- ' prefix
      if (objective) {
        objectives.push(objective);
      }
    }
  }

  return objectives;
}

/**
 * Extract the description/overview from markdown
 * Returns the first paragraph(s) before any heading
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {string} Description text
 */
export function parseDescription(markdown) {
  const lines = markdown.split('\n');
  let description = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Stop at first heading
    if (line.startsWith('#')) {
      break;
    }

    // Skip empty lines at start, but capture content
    if (line.trim()) {
      description.push(line.trim());
    } else if (description.length > 0 && line.trim() === '') {
      // Keep empty lines within description
      description.push('');
    }
  }

  // Join and clean up
  let result = description.join('\n').trim();

  // Remove leading/trailing empty paragraphs
  result = result.split('\n\n')[0]; // Take first paragraph block

  return result;
}

/**
 * Extract all sections from markdown with their content
 * Returns sections organized by heading level
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<{level: number, title: string, content: string}>} Array of sections
 */
export function extractSections(markdown) {
  const sections = [];
  const lines = markdown.split('\n');
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#+)\s+(.+)$/);

    if (headingMatch) {
      // Save previous section if it exists
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }

      // Start new section
      const level = headingMatch[1].length;
      const title = headingMatch[2];

      currentSection = {
        level,
        title,
        content: ''
      };
    } else if (currentSection) {
      // Add content to current section
      currentSection.content += line + '\n';
    }
  }

  // Don't forget the last section
  if (currentSection) {
    currentSection.content = currentSection.content.trim();
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Check if markdown contains a reference to prerequisites
 *
 * @param {string} markdown - The markdown content to check
 * @returns {Array<string>} Array of prerequisite file names referenced
 */
export function extractPrerequisiteReferences(markdown) {
  const prerequisites = [];

  // Match markdown links like [text](Prerequisites/file.md) or [text](Prerequisites.md)
  const linkPattern = /\[([^\]]+)\]\(([^)]*Prerequisites[^)]*\.md)\)/gi;

  let match;
  while ((match = linkPattern.exec(markdown)) !== null) {
    const filePath = match[2];
    prerequisites.push(filePath);
  }

  return prerequisites;
}

/**
 * Extract internal links within markdown content
 * Returns all markdown links found in the document
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<{title: string, url: string}>} Array of links found
 */
export function extractLinks(markdown) {
  const links = [];

  // Match markdown links [title](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  let match;
  while ((match = linkPattern.exec(markdown)) !== null) {
    links.push({
      title: match[1],
      url: match[2]
    });
  }

  return links;
}

/**
 * Extract code blocks from markdown
 * Returns code blocks with their language identifier
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<{language: string, code: string}>} Array of code blocks
 */
export function extractCodeBlocks(markdown) {
  const blocks = [];

  // Match triple-backtick code blocks
  const codeBlockPattern = /```(\w*)\n([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    });
  }

  return blocks;
}

/**
 * Calculate reading time estimate for markdown content
 * Assumes ~200 words per minute reading speed
 *
 * @param {string} markdown - The markdown content
 * @returns {number} Estimated reading time in minutes
 */
export function estimateReadingTime(markdown) {
  // Remove markdown syntax
  const text = markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/[#*`[\]()]/g, '') // Remove markdown syntax
    .trim();

  const wordCount = text.split(/\s+/).length;
  const minutesPerWord = 1 / 200;

  return Math.max(1, Math.ceil(wordCount * minutesPerWord));
}

/**
 * Sanitize markdown for safe display
 * Removes potentially harmful patterns while preserving links and formatting
 *
 * @param {string} markdown - The markdown content to sanitize
 * @returns {string} Sanitized markdown
 */
export function sanitizeMarkdown(markdown) {
  // Remove script tags and javascript: URLs
  let sanitized = markdown
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  return sanitized;
}

/**
 * Extract ## level content sections from deep-dive markdown
 * Returns sections split by ## headings with a URL-safe slug
 *
 * @param {string} markdown - The markdown content to parse
 * @returns {Array<{heading: string, slug: string, content: string}>}
 */
export function extractContentSections(markdown) {
  const sections = []
  const lines = markdown.split('\n')
  let currentHeading = null
  let currentLines = []

  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      if (currentHeading !== null) {
        sections.push({
          heading: currentHeading,
          slug: currentHeading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
          content: currentLines.join('\n').trim(),
        })
      }
      currentHeading = match[1]
      currentLines = []
    } else if (currentHeading !== null) {
      currentLines.push(line)
    }
  }

  if (currentHeading !== null) {
    sections.push({
      heading: currentHeading,
      slug: currentHeading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      content: currentLines.join('\n').trim(),
    })
  }

  return sections
}
