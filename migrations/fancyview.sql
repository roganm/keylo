CREATE VIEW fancy AS
SELECT ind.name, ind.guid, t.total as total, t.cnt as cnt, (t.total / t.cnt) as average, sum(DATEDIFF(CURRENT_DATE(), lst.created_at)) as age
FROM individuals ind
LEFT JOIN
(SELECT lro.individualid, sum(CAST(replace(replace(ifnull(price,0),',',''),'$','') AS decimal(10))) as total, COUNT(*) as cnt, sum(DATEDIFF(CURRENT_DATE(), lst.created_at)) as age
FROM listing_realtor_organization lro
INNER JOIN listings lst
ON lst.guid = lro.listingid
GROUP BY lro.individualid) t
ON ind.GUID = t.individualid
ORDER BY average DESC;