import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/search/rentals";

export const fetchRentals = async (params: Record<string, string | number>) => {
  try {
    console.log("Запрос к API с параметрами:", params);

    const allRentals: any[] = [];
    let currentPage = 1;
    let totalItems = 0;

    while (true) {
      console.log(`Запрос к API: страница ${currentPage}`);

      const response = await axios.get(BASE_URL, {
        params: { ...params, page: currentPage },
      });

      const data = response.data;

      // Сохраняем текущую страницу данных
      allRentals.push(...data["hydra:member"]);

      // Устанавливаем общее количество элементов
      if (currentPage === 1) {
        totalItems = data["hydra:totalItems"];
      }

      // Проверяем, получили ли все данные
      if (allRentals.length >= totalItems) {
        break;
      }

      // Переходим на следующую страницу
      currentPage++;
    }

    console.log("Все данные загружены:", allRentals);

    return {
      rentals: allRentals,
      totalItems,
    };
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    throw error;
  }
};
