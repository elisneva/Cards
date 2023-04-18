const API_URL = 'https://educated-spiky-tortellini.glitch.me';
export const fetchCategories = async () => {
    
    //errors, if we have error break try and continue with catch
    try {
        //waiting the response from server
        const response = await fetch(`${API_URL}/api/category`);

        if (response.status === 200 || response.status === 201) {
            //decode
            const categories = await response.json();
            return categories;
        } else {
            const error = await response.json();
            //stop working
            throw error;
        }
    } catch (e) {
        return { error };
    }
}