import axios from "axios";
const VITE_AUCTION_API = import.meta.env.VITE_AUCTION_API;


// getting list of all auction
export const getAuctions = async () => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting auction data", error.message);
    }
}

// getting list of all auction
export const getMyAuctions = async () => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}/myauction`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting my auction data", error.message);
    }
}


// getting single auction using _id
export const viewAuction = async (id) => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}/${id}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting auction data", error.message);
    }
}

// placing bid for auction
export const placeBid = async ({ bidAmount, id }) => {
    const res = await axios.post(`${VITE_AUCTION_API}/${id}`,
        { bidAmount: Number(bidAmount) },
        { withCredentials: true }
    )
    return res.data;
}


// creating new auction
export const createAuction = async (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("startingPrice", data.startingPrice);
    formData.append("itemDescription", data.itemDescription);
    formData.append("itemCategory", data.itemCategory);
    formData.append("itemStartDate", data.itemStartDate);
    formData.append("itemEndDate", data.itemEndDate);
    formData.append("itemPhoto", data.itemPhoto);

    const res = await axios.post(`${VITE_AUCTION_API}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    );
    return res.data;
}

// getting single auction using _id
export const dashboardStats = async () => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}/stats`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting dashboard data", error.message);
    }
}