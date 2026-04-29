import { Request, Response } from "express";
import {
  getTrending,
  getPopularMovies,
  getPopularSeries
} from "../services/tmdb.service";

export const trending = async (_: Request, res: Response) => {
  try {
    const data = await getTrending();
    res.json(data);
  } catch (error: any) {
    console.error("TMDB trending error:", error.message);
    res.status(500).json({ message: "Error TMDB trending" });
  }
};

export const moviesPopular = async (_: Request, res: Response) => {
  try {
    const data = await getPopularMovies();
    res.json(data);
  } catch (error: any) {
    console.error("TMDB movies error:", error.message);
    res.status(500).json({ message: "Error TMDB movies" });
  }
};

export const seriesPopular = async (_: Request, res: Response) => {
  try {
    const data = await getPopularSeries();
    res.json(data);
  } catch (error: any) {
    console.error("TMDB series error:", error.message);
    res.status(500).json({ message: "Error TMDB series" });
  }
};