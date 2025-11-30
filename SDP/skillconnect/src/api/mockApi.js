// mockApi.js
// Simple promise-based wrapper to simulate API calls with network delay.
// It reads/writes from localStorage keys: "services", "users"

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const api = {
  fetchServices: async () => {
    await delay(500);
    const list = JSON.parse(localStorage.getItem("services")) || [];
    return { data: list };
  },

  createService: async (service) => {
    await delay(400);
    const list = JSON.parse(localStorage.getItem("services")) || [];
    list.push(service);
    localStorage.setItem("services", JSON.stringify(list));
    return { data: service };
  },

  updateService: async (service) => {
    await delay(400);
    let list = JSON.parse(localStorage.getItem("services")) || [];
    list = list.map((s) => (s.id === service.id ? service : s));
    localStorage.setItem("services", JSON.stringify(list));
    return { data: service };
  },

  deleteService: async (id) => {
    await delay(300);
    let list = JSON.parse(localStorage.getItem("services")) || [];
    list = list.filter((s) => s.id !== id);
    localStorage.setItem("services", JSON.stringify(list));
    return { data: { id } };
  },
};
