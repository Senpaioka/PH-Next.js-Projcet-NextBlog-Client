import { getAuth } from "firebase/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function setAuthToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  try {
    const token = await user.getIdToken();

    // send token to backend to store in HTTP-only cookie
    const response = await fetch(`${BASE_URL}/set-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      credentials: "include", // important to receive cookie
    });

    if (!response.ok) {
      console.error("Failed to set auth token in cookie");
    }
    } catch (error) {
    console.error("Error setting auth token:", error);
  }
}

export {setAuthToken};

    // alternative option : store in client cookie (less secure)
    // document.cookie = `token=${token}; Path=/; Secure; SameSite=Strict;`;

