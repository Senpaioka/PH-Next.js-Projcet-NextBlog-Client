

async function clearAuthToken() {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include", // send cookies
  });
}

export { clearAuthToken };
