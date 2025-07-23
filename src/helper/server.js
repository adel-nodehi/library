function server(url) {
  async function getData() {
    try {
      return JSON.parse(localStorage.getItem(url)) || [];
    } catch {
      alert('fetch data failed');
    }
  }

  async function addData(data) {
    try {
      const storedData = await getData();
      storedData.push(data);
      localStorage.setItem(url, JSON.stringify(storedData));
      return data;
    } catch {
      alert('add data failed');
    }
  }

  async function deleteItem(id) {
    try {
      const storedData = await getData();

      localStorage.setItem(
        url,
        JSON.stringify(storedData.filter((data) => data.id !== id))
      );
    } catch {
      alert('delete item failed');
    }
  }

  return { getData, addData, deleteItem };
}

export { server };
