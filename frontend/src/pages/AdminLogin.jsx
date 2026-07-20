// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = (e) => {
//     e.preventDefault();

//     if (
//       email === "admin@store.com" &&
//       password === "admin123"
//     ) {
//       localStorage.setItem("admin", "true");
//       navigate("/admin");
//     } else {
//       alert("Invalid Admin Credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 flex justify-center items-center">

//       <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

//         <h1 className="text-3xl font-bold text-center mb-8">
//           Admin Login
//         </h1>

//         <form onSubmit={login}>

//           <input
//             type="email"
//             placeholder="Admin Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border rounded-lg px-4 py-3 mb-5"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded-lg px-4 py-3 mb-5"
//           />

//           <button
//             className="w-full bg-blue-700 text-white py-3 rounded-lg"
//           >
//             Login
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default AdminLogin;