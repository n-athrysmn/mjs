import { AIReadingProps } from "@/common/interface";
import axios from "axios";

export const getAIReading = async (props: AIReadingProps) => {
  try {
    const response = await axios.post("/api/get-reading", props);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};
