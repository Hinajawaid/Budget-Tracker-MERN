const SERVER_URL: string = "http://35.180.254.36:5000";
import { userLoginInfo, userSignUpInfo } from "../../types/User";

const request = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      if (!options.headers) {
        options.headers = {} as HeadersInit;
      }
      (options.headers as Record<string, string>)[
        "authorization"
      ] = `Bearer ${token}`;
    }

    const response = await fetch(`${SERVER_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error: any) {
    console.log(error.message);
    return error.message as Promise<T>;
  }
};

export const signUpAPI = (form: userSignUpInfo) =>
  request<void>("/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

export const signInAPI = async (form: userLoginInfo) =>
  request<{ token?: string }>("/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

// export const addProductsAPI = (form: AddProductsForm) =>
//   request<void>("/Products/addproducts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   });

// export const viewProductsAPI = () =>
//   request<Product[]>("/Products/viewproducts", {
//     method: "GET",
//   });

// export const deleteProductsAPI = (form: { id: string }) =>
//   request<void>("/Products/deleteproducts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   });

// export const viewProductByIdAPI = (id: string) =>
//   request<Product>(`/Products/viewProductById/${id}`, {
//     method: "GET",
//   });

// export const updateProductsAPI = (form: UpdateProductsForm) =>
//   request<void>("/Products/updateproducts", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   });
