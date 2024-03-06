SELECT DISTINCT ON (year, month)
  year,
  month,
  customer_id,
  total_monthly_order_value
FROM (
  SELECT
    EXTRACT(YEAR FROM o.ordered_at) AS year,
    EXTRACT(MONTH FROM o.ordered_at) AS month,
    o.customer_id,
    SUM(oli.unit_price * oli.quantity) AS total_monthly_order_value
  FROM orders o
  INNER JOIN order_line_items oli ON o.order_id = oli.order_id
  GROUP BY year, month, o.customer_id
) AS monthly_totals
ORDER BY year, month, total_monthly_order_value DESC, customer_id;