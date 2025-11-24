const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


async function createBlog(user, blog_data) {

    if (!user) return;

    const token = await user.getIdToken();

    try {
        const response = await fetch(`${BASE_URL}/create-blog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...blog_data,
        }),
        });
        
    const data = await response.json();

    if (!response.ok) {
      // Throw error with backend message
      throw new Error(data.message || "Blog Not Published.");
    }
    return data;
    
  } catch (error) {
        console.error("Blog Publish Unsuccessful.", error);
        throw error;
  }
}







async function getArticles() {

    try {
        const response = await fetch(`${BASE_URL}/get-blogs`,
            {
                method: "GET",
            }
        );

        return await response.json();

    }catch(error){
        console.error("Something Went Wrong.", error);
        throw error;
    }
}




  async function getBlogDetails(user, id) {

    const token = await user.getIdToken();
    
    try {
        const response = await fetch(`${BASE_URL}/blog-details/${id}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
      });
      
      return await response.json();

    } catch (error) {
        console.error("Error Loading Blog Details", error);
        throw error;
    }
  }




export {createBlog, getArticles, getBlogDetails};

