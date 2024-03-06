SELECT 
  c.name,
  COUNT(o.order_id) AS num_orders,
  SUM(oli.total_value) AS total_order_value,
  FLOOR(AVG(oli.total_value)) AS avg_order_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN (
  SELECT order_id, SUM(unit_price * quantity) AS total_value
  FROM order_line_items
  GROUP BY order_id
) oli ON o.order_id = oli.order_id
GROUP BY c.name
ORDER BY avg_order_value DESC;
