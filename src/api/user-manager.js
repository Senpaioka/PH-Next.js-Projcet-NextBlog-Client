const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


async function createUser(user) {

    if (!user) return;

    const token = await user.getIdToken();
    const provider = user.providerData[0];

    try {
        const response = await fetch(`${BASE_URL}/registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            uid: user.uid ?? null,
            name: provider.displayName,
            email: provider.email,
            photo: provider.photoURL,
            providerId: provider.providerId ?? null,
            emailVerified: user.emailVerified ?? false,
        }),
        });
        
    const data = await response.json();

    if (!response.ok) {
      // Throw error with backend message
      throw new Error(data.message || "Registration Failed");
    }
    return data;
    
  } catch (error) {
    console.error("Registration Unsuccessful.", error);
    throw error;
  }
}


export {createUser};
