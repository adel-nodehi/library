function server(url) {
  async function getData() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      alert(`Something is wrong with server \n ${err.message}`);
    }
  }

  async function addData(data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      return responseData;
    } catch (err) {
      alert(`Something is wrong with server \n ${err.message}`);
    }
  }

  async function updateItem(id, data) {
    try {
      await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      alert(`Something is wrong with server \n ${err.message}`);
    }
  }

  async function deleteItem(id) {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert(`Something is wrong with server \n ${err.message}`);
    }
  }

  return { getData, addData, updateItem, deleteItem };
}

export { server };
