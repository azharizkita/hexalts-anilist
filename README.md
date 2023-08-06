## API limitations

- pagination seems to always return maximum number of `5000 / page size` instead of the real maximum page.
- rate limitation applies for 90 requests per minutes. by this case I decided to not implement SEO optimization (yet) in anime detail page to avoid unintended rate limit at server side. currently the strategy is to distribute API rate limit into individual user device. see my note at [here](https://github.com/azharizkita/hexalts-anilist/blob/76595dbc91202bc65fb6dbb15cddf7582c5b3399/src/pages/anime/%5Banime_id%5D.tsx#L209)