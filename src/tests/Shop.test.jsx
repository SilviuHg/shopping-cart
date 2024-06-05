import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Shop from "../components/Shop";
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
} from "react-router-dom";
