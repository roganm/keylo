CREATE VIEW fancy AS
SELECT ind.name, ind.guid, t.total as total, t.cnt as cnt, (t.total / t.cnt) as average
FROM individuals ind
LEFT JOIN
(SELECT lro.individualid, sum(CAST(replace(replace(ifnull(price,0),',',''),'$','') AS decimal(10))) as total, COUNT(*) as cnt
FROM listing_realtor_organization lro
INNER JOIN listings lst
ON lst.guid = lro.listingid
GROUP BY lro.individualid) t
ON ind.GUID = t.individualid
ORDER BY average DESC;