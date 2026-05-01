-- Seed verisiyle uyumlu Kur'an geçiş notlarını mevcut isim satırlarına yazar (yalnızca slug eşleşmesi).
UPDATE public."Name" AS n
SET
  "quranReference" = v.ref,
  "updatedAt" = now()
FROM (
  VALUES
    ('elif', $r$Bakara ve benzeri sure başlarındaki müstakil harf gruplarında elif harfi geçer.$r$),
    ('hafsa', $r$Nisâ ve Ahzâb vb. surelerde peygamber ailesi ve müminlere yönelik ayetlerle ümmü'l-mü'minîn geleneğinde anılır.$r$),
    ('meryem', $r$Meryem suresi (19); Âl-i İmrân, İsâ vb. surelerde Hz. Meryem anılır.$r$),
    ('nisa', $r$Nisâ suresi (4); 'nisa' (kadınlar) kelimesi birçok ayette geçer.$r$),
    ('eymen', $r$Sağ / müyesser anlamlarında 'ayman' köküyle farklı surelerde kullanımlar bulunur.$r$),
    ('taha', $r$Tâ-Hâ suresi (20); sure başında ve Hz. Musa kıssasında yer alır.$r$),
    ('mirac', $r$İsrâ suresi (17), 1. ayette gece yürüyüşü (isrâ) anlatılır; Miraç hadisesiyle özdeşleşir.$r$),
    ('yusuf', $r$Yusuf suresi (12); Bakara, Kasas vb. birçok surede Hz. Yusuf kıssası anlatılır.$r$),
    ('musa', $r$Bakara, Araf, Kasas, Tâ-Hâ vb. birçok surede Hz. Musa kıssaları yer alır.$r$),
    ('harun', $r$Tâ-Hâ, A'raf vb. surelerde Hz. Harun, Hz. Musa ile birlikte anılır.$r$),
    ('ismail', $r$Bakara, İbrâhîm, Saffât vb. surelerde Hz. İsmail anlatılır.$r$),
    ('ibrahim', $r$İbrâhîm suresi (14) ile Bakara, Neml vb. birçok surede Hz. İbrahim kıssası bulunur.$r$),
    ('adem', $r$Bakara, A'raf, İsrâ vb. surelerde ilk insan Hz. Âdem anlatılır.$r$),
    ('yunus', $r$Yunus suresi (10) ve Saffât, Enbiyâ vb. surelerde Hz. Yunus anılır.$r$),
    ('yahya', $r$Meryem ve Âl-i İmrân surelerinde Hz. Yahya'nın doğumu anlatılır.$r$),
    ('isa', $r$Meryem, Nisâ, Âl-i İmrân vb. surelerde Hz. İsa (Kelimetullah) geçer.$r$),
    ('nuh', $r$Nuh suresi (71) ve Hûd, Şuarâ vb. surelerde Hz. Nuh kıssası yer alır.$r$),
    ('zeynep', $r$Kur'an metninde çeşitli isimler geçer; ümmü'l-mü'minîn ve sahâbe geleneğinde yaygın bir addır.$r$),
    ('ahmet', $r$Saff suresi (61), 6. ayette gelecek peygambere işaret eden ifadelerde Ahmed adı geçer.$r$),
    ('ali', $r$Yücelik kökünden 'a'lâ / alî' kullanımları birçok ayette bulunur; Hz. Ali ismi bu kök ve siyer geleneğiyle ilişkilendirilir.$r$),
    ('hasan', $r$Hüsn, ihsân, muhsin kökleri Kur'an'da sıkça geçer.$r$),
    ('omer', $r$Emir/iş kökünden 'amr' ayetlerde yer alır; sahâbe ismi olarak Hz. Ömer geleneğiyle anılır.$r$)
) AS v(slug, ref)
WHERE n.slug = v.slug
  AND n."inQuran" IS true;
