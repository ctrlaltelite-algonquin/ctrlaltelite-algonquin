module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    pathPrefix: "/ctrlaltelite-algonquin/",
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      output: "_site"
    }
  };
};