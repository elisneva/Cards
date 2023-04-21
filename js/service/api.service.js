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

export const fetchCards = async id => {
    
    //errors, if we have error break try and continue with catch
    try {
        //waiting the response from server
        const response = await fetch(`${API_URL}/api/category/${id}`);

        if (response.status === 200 || response.status === 201) {
            //decode
            const cards = await response.json();
            return cards;
        } else {
            const error = await response.json();
            //stop working
            throw error;
        }
    } catch (e) {
        return { error };
    }
};

export const fetchCreateCategory = async data => {
    
    //errors, if we have error break try and continue with catch
    try {
        //waiting the response from server
        const response = await fetch(`${API_URL}/api/category/`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (!(response.status === 200 || response.status === 201)) {
            //decode
            const error = await response.json();
            //stop working
            throw error;
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        return { error };
    }
};

export const fetchEditCategory = async (id, data) => {
    
    //errors, if we have error break try and continue with catch
    try {
        //waiting the response from server
        const response = await fetch(`${API_URL}/api/category/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });

        if (!(response.status === 200 || response.status === 201)) {
            //decode
            const error = await response.json();
            //stop working
            throw error;
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        return { error };
    }
};

export const fetchDeleteCategory = async (id) => {
    
    //errors, if we have error break try and continue with catch
    try {
        //waiting the response from server
        const response = await fetch(`${API_URL}/api/category/${id}`, {
            method: 'DELETE',

        });

        if (!(response.status === 200 || response.status === 201)) {
            //decode
            const error = await response.json();
            //stop working
            throw error;
        }
        const res = await response.json();
        return res;
    } catch (error) {
        return { error };
    }
};