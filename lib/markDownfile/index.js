/**
 *separate table-data of Markdown-file into 2-dimentionality Arrays
 * @param {String} data
 * the String of Table in Markdowm file
 * @returns
 * return 2-dimentionality Arrays. all row data are 1-dimentionality Array
 */
const separateTableData = data =>
  data.split("|\n").map(e =>
    e
      .slice(1, -1)
      .split("|")
      .map(f => f.trim())
  );

export { separateTableData };
