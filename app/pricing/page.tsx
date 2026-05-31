"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

const PRICE_ID_MONTHLY = "pri_MONTHLY_PLACEHOLDER";
const PRICE_ID_ANNUAL  = "pri_ANNUAL_PLACEHOLDER";
const PADDLE_CLIENT_TOKEN = "test_PADDLE_TOKEN_PLACEHOLDER";

export default function Pricing() {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null);

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: PADDLE_CLIENT_TOKEN,
    }).then((paddleInstance) => {
      if (paddleInstance) setPaddle(paddleInstance);
    });
  }, []);

  const openCheckout = (priceId: string, plan: "monthly" | "annual") => {
    if (!paddle) return;
    setLoading(plan);
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "en",
      },
    });
    setTimeout(() => setLoading(null), 1500);
  };
  // ... reste du JSX identique avec les boutons remplacés
