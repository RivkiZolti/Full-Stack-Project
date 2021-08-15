export function editUser(userId, details) {
    fetch("http://localhost:27017/orders/getAll/" + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });
}
export async function getAll(){
    let data = await fetch('http://localhost:27017/product/getAlle')
    console.log(data.json());
    return await data.json();
  }