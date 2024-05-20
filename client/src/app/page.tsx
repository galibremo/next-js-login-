"use client";
import React from "react";
import { StoreProvider } from "../redux/storeProvider";

export default function Home() {
  return (
    <StoreProvider>
      <main>Home</main>;
    </StoreProvider>
  );
}
