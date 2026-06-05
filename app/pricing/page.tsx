"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "@/app/providers";
import { useRouter } from "next/navigation";

const PRICE_ID_MONTHLY = "pri_01ktagbshae0scvhh0tgwzjq7f";
const PRICE_ID_ANNUAL  = "pri_01ktagvsjaqeqk2sqaar85p5ps";
const PADDLE_CLIENT_TOKEN = "live_b49544053d0f20bbece59cfb6a5";
