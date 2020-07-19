// const root = 'http://localhost/';
const root = 'http://49.247.215.15:8080/';
export const readHome = `${root}products?init`;
export const readDetailItem = `${root}products?id=`;
export const readCategoryItem = `${root}products?category1=`;
export const updateBuyItem = `${root}events?event=buy&`;

export const getToDB = async url => {
    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            }, method: "GET"
        });
        const toJson = res.json();
        return toJson;
    } catch (e) {
        console.log(`요청이 실패하였습니다. 오류 :: ` + e);
        alert(`요청이 실패하였습니다. 오류 :: ` + e);
    }
};

export const putToDB = async (url, putBodyObj) => {
    const obj = {
        body: JSON.stringify(putBodyObj), //body2Json,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "PUT"
    };
    try {
        const res = await fetch(url, obj);
        const toJson = await res.json();
        return toJson;

    } catch (e) {
        console.log(`요청이 실패하였습니다. 오류 :: ${e}`);
        alert(`요청이 실패하였습니다. 오류 :: ${e}`);
        const notOK = null;
        return notOK;
    }
};

export const deleteToDB = async (url, deleteBodyObj) => {
    const obj = {
        body: JSON.stringify(deleteBodyObj), //body2Json,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "DELETE"
    };

    try {
        const res = await fetch(url, obj);
        const toJson = await res.json();
        return toJson;
    } catch (e) {
        console.log(`요청이 실패하였습니다. 오류 :: ` + e);
        alert(`요청이 실패하였습니다. 오류 :: ` + e);
        const notOK = null;
        return notOK;
    }
};

export const postToDB = async (url, postBodyObj) => {
    const obj = {
        body: JSON.stringify(postBodyObj), //body2Json,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST"
    };

    try {
        const res = await fetch(url, obj);
        const toJson = await res.json();
        return toJson;
    } catch (e) {
        // console.log(`요청이 실패하였습니다. 오류 :: ` + e);
        // alert(`요청이 실패하였습니다. 오류 :: ` + e);
        // const notOK = null;
        // return notOK;
    }
};