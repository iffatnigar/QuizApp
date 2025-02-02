import axios from "axios";

const PROXY_URLS = [
  "https://api.allorigins.win/raw?url=",
  "https://thingproxy.freeboard.io/fetch/",
  "https://corsproxy.io/?",
];

const API_URL = "https://api.jsonserve.com/Uw5CrX";

export const fetchQuizData = async () => {
  for (let proxy of PROXY_URLS) {
    try {
      const response = await axios.get(proxy + API_URL);

      if (response.data?.questions?.length > 0) {
        return response.data.questions.map((q) => ({
          id: q.id,
          question: q.description,
          options: q.options ? q.options.map((opt) => opt.description) : [],
          answer: q.options?.find((opt) => opt.is_correct)?.description || null,
          image: q.photo_url || null,
        }));
      }
    } catch (error) {
      console.warn(`Proxy failed: ${proxy}, trying next...`, error.message);
    }
  }

  console.error("All proxy servers failed. Unable to fetch quiz data.");
  return [];
};
