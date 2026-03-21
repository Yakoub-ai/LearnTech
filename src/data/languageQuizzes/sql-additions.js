/**
 * Additional SQL quiz questions — supplements the base set in languageQuizzes.js
 * Keyed by level: beginner / mid / senior
 */
export const additions = {
  beginner: [
    {
      question: 'You have an index on the `order_date` column, but the following query still performs a full table scan. What is the most likely cause?\n\nSELECT SUM(total) FROM orders WHERE YEAR(order_date) = 2025;',
      options: [
        'The index needs to be rebuilt with REINDEX before it can be used',
        'Applying a function to an indexed column prevents the database from using the index',
        'SUM() aggregate functions always force a full table scan',
        'The index is on the wrong data type for year comparisons',
      ],
      correctIndex: 1,
      explanation:
        'When you wrap an indexed column in a function such as YEAR(), the database cannot use a B-tree index on that column. The index stores the raw date values in sorted order; after applying a function the result has no connection to those stored values. The fix is to rewrite the filter as an explicit date range: WHERE order_date >= \'2025-01-01\' AND order_date < \'2026-01-01\'.',
    },
    {
      question: 'Which of the following correctly explains why `SELECT *` is considered an anti-pattern in production queries?',
      options: [
        'SELECT * is slower because the SQL parser takes longer to expand the wildcard',
        'SELECT * fetches all columns, increasing network transfer and memory use, and can break application code if the schema changes',
        'SELECT * cannot be used with WHERE clauses',
        'SELECT * always forces the database to perform a sequential scan',
      ],
      correctIndex: 1,
      explanation:
        'SELECT * retrieves every column in the table, which increases the amount of data transferred over the network and loaded into memory. More importantly, if a column is added, removed, or reordered, application code that relies on column position or assumes a fixed set of columns can silently break. Naming only the columns you need makes queries self-documenting and resilient to schema changes.',
    },
    {
      question: 'A query uses `WHERE status = \'cancelled\' AND order_date < \'2024-01-01\'`. You have a composite index on `(status, order_date)`. Which of the following statements about this index is correct?',
      options: [
        'The index cannot be used because the query has two conditions',
        'The index is used for both conditions: equality on status narrows the set, then the range on order_date filters within it',
        'The index is only used for the order_date condition because date columns are more selective',
        'Composite indexes are only useful when both conditions use equality operators',
      ],
      correctIndex: 1,
      explanation:
        'A composite index on (status, order_date) is used left to right. The leading equality condition on status eliminates all rows with other statuses, then the inequality on order_date further narrows the result within the matching status group. This is the ideal use of a composite index: equality filters first, range filters last.',
    },
  ],
  mid: [
    {
      question: 'You add an index to a column but the database\'s query planner still chooses a full table scan over the index. According to the indexing talk by Kai Sassnowski, what is the most likely reason?',
      options: [
        'The index was created with incorrect syntax and is invalid',
        'The query needs columns that are not in the index, so fetching each row individually via the index costs more than batch-reading the whole table',
        'Full table scans are always chosen when the table has more than one million rows',
        'The database requires a VACUUM before newly created indexes become active',
      ],
      correctIndex: 1,
      explanation:
        'An index only stores values for its indexed columns plus a row ID. If the query needs additional columns not in the index, the database must perform a separate heap fetch for each matching row. When the matching set is large, those individual random reads can be slower than a sequential full table scan that reads everything in batches. The solution is a covering index (using INCLUDE in PostgreSQL) that adds the extra columns so the query can be satisfied entirely from the index — an index-only scan.',
    },
    {
      question: 'You have a composite index on `(user_id, created_at)` and want to query: `WHERE user_id = 136 AND created_at BETWEEN \'2013-01-01\' AND \'2013-12-31\'`. How does the index column order affect this query?',
      options: [
        'Column order does not matter; the optimizer will use whichever column is more selective',
        'user_id should be second because created_at is used for range filtering and must lead the index',
        'user_id as the leading column is correct: equality on user_id narrows rows first, then the range on created_at filters within those rows',
        'The index cannot be used because BETWEEN operators require a separate index',
      ],
      correctIndex: 2,
      explanation:
        'A composite index is usable from left to right. Placing user_id first with an equality condition is ideal: the database jumps directly to all rows for that user, then uses the sorted created_at values within that group to apply the range filter. If created_at were leading, the range condition would prevent the database from using user_id for filtering at all, because inequality operators stop further index use on subsequent columns.',
    },
    {
      question: 'Which window function correctly returns the rank of each product by price within its category, assigning the same rank to ties but NOT skipping subsequent rank numbers?',
      options: [
        'ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)',
        'RANK() OVER (PARTITION BY category ORDER BY price DESC)',
        'DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC)',
        'NTILE(1) OVER (PARTITION BY category ORDER BY price DESC)',
      ],
      correctIndex: 2,
      explanation:
        'DENSE_RANK() assigns the same rank to tied values and does not skip numbers after a tie. For example, two products priced at $100 both receive rank 1, and the next product receives rank 2. RANK() also handles ties but skips numbers — those two $100 products still both get rank 1, but the next product gets rank 3 (skipping 2). ROW_NUMBER() never assigns the same number to two rows even if their values are identical.',
    },
  ],
  senior: [
    {
      question: 'In PostgreSQL\'s MVCC implementation, what happens internally when you UPDATE a row?',
      options: [
        'The existing row is modified in place and the old value is stored in a separate undo log',
        'The old row version has its xmax set to the current transaction ID, and a new row version is written with xmin set to the current transaction ID',
        'The row is locked and written to a write-ahead log; the heap page is not changed until COMMIT',
        'A copy of the row is written to a temporary buffer and swapped atomically with the original at COMMIT',
      ],
      correctIndex: 1,
      explanation:
        'PostgreSQL\'s MVCC model never modifies rows in place. Instead, an UPDATE marks the old row version as expired by setting its hidden xmax column to the current transaction ID, then inserts a brand-new row version with xmin set to the current transaction ID. Concurrent readers see whichever version matches their transaction snapshot. The old "dead tuple" remains on disk until VACUUM reclaims the space, which is why long-running transactions and high-churn tables require careful autovacuum tuning.',
    },
    {
      question: 'You need to add a foreign key constraint to an `orders` table with 50 million rows without blocking application writes. What is the correct PostgreSQL approach?',
      options: [
        'Use a transaction-level table lock and add the constraint inside a single long transaction',
        'Add the constraint as NOT VALID (instant, skips existing rows), then validate it separately with ALTER TABLE ... VALIDATE CONSTRAINT',
        'Drop and recreate the orders table with the constraint defined in CREATE TABLE',
        'Use CREATE INDEX CONCURRENTLY on the foreign key column before adding the constraint',
      ],
      correctIndex: 1,
      explanation:
        'The two-step approach keeps writes unblocked throughout. NOT VALID adds the constraint immediately without scanning existing rows — new rows are checked from that point on. The subsequent VALIDATE CONSTRAINT scans existing rows holding only a ShareUpdateExclusiveLock, which blocks neither reads nor writes (only other DDL). This is the standard zero-downtime pattern for adding referential integrity to large existing tables.',
    },
    {
      question: 'When choosing between a Nested Loop Join, Hash Join, and Merge Join, which combination of conditions makes a Hash Join the best choice?',
      options: [
        'Both tables are small and one has an index on the join column',
        'Both tables are large, there are no indexes on the join columns, and memory is sufficient to build a hash table from the smaller table',
        'Both inputs are already sorted on the join key and the query requires the result in sorted order',
        'The outer table returns only a few rows after filtering and the inner table has an index on the join key',
      ],
      correctIndex: 1,
      explanation:
        'A Hash Join builds an in-memory hash table from the smaller relation, then probes it with each row from the larger relation — O(N + M) cost with no index requirement. It is optimal when both tables are large, no useful index exists on the join columns, and the smaller table fits in work_mem. A Nested Loop is best when the outer side is small and the inner has an index (O(N log M)). A Merge Join wins when both inputs arrive pre-sorted, avoiding the sort cost and enabling a single linear pass through each.',
    },
  ],
}
