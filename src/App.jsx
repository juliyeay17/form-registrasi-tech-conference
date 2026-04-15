import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // 🔧 Custom Password Validation
  const validatePassword = (value) => {
    const hasMinLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);

    return (
      (hasMinLength && hasNumber && hasSymbol) ||
      "Password harus 8+ karakter, mengandung angka & simbol"
    );
  };

  // ✅ Submit Handler
  const onSubmit = (data) => {
    console.log(data);
    setSubmittedName(data.fullName);
    setIsSubmitted(true);
    reset();
  };

  // ⏳ Auto hide success message
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div className="container">
      <h2 className="title">Form Registrasi Tech Conference</h2>
      <p className="subtitle">Isi form untuk mendaftar event</p>

      {isSubmitted && (
        <div className="success-box">
          Registrasi Berhasil, {submittedName}!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">

        {/* 1. Nama Lengkap */}
        <div>
          <label>Nama Lengkap *</label>
          <input
            className={errors.fullName ? "input error-border" : "input"}
            placeholder="Masukkan nama lengkap"
            {...register("fullName", {
              required: "Nama lengkap wajib diisi",
            })}
          />
          <p className="error">{errors.fullName?.message}</p>
        </div>

        {/* 2. Username */}
        <div>
          <label>Username *</label>
          <input
            className={errors.username ? "input error-border" : "input"}
            placeholder="Minimal 6 karakter"
            {...register("username", {
              required: "Username wajib diisi",
              minLength: {
                value: 6,
                message: "Username minimal 6 karakter",
              },
              maxLength: {
                value: 20,
                message: "Username maksimal 20 karakter",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        {/* 3. Email */}
        <div>
          <label>Email *</label>
          <input
            className={errors.email ? "input error-border" : "input"}
            placeholder="contoh@email.com"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* 4. Password */}
        <div>
          <label>Password *</label>
          <input
            type="password"
            className={errors.password ? "input error-border" : "input"}
            placeholder="Minimal 8 karakter"
            {...register("password", {
              required: "Password wajib diisi",
              validate: validatePassword,
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        {/* 5. Umur */}
        <div>
          <label>Umur *</label>
          <input
            type="number"
            className={errors.age ? "input error-border" : "input"}
            placeholder="18 - 100"
            {...register("age", {
              required: "Peserta harus berusia antara 18 dan 100 tahun",
              min: {
                value: 18,
                message: "Peserta harus berusia antara 18 dan 100 tahun",
              },
              max: {
                value: 100,
                message: "Peserta harus berusia antara 18 dan 100 tahun",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        {/* 6. Tipe Tiket */}
        <div>
          <label>Tipe Tiket *</label>
          <select
            className={errors.ticketType ? "input error-border" : "input"}
            {...register("ticketType", {
              required: "Anda harus memilih tipe tiket",
            })}
          >
            <option value="">-- Pilih Tipe Tiket --</option>
            <option value="general">General Access</option>
            <option value="vip">VIP</option>
            <option value="student">Student</option>
          </select>
          <p className="error">{errors.ticketType?.message}</p>
        </div>

        {/* 7. Website */}
        <div className="full-width">
          <label>Website (Opsional)</label>
          <input
            className={errors.websiteUrl ? "input error-border" : "input"}
            placeholder="https://example.com"
            {...register("websiteUrl", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Format URL tidak valid",
              },
            })}
          />
          <p className="error">{errors.websiteUrl?.message}</p>
        </div>

        {/* 8. Terms */}
        <div className="full-width checkbox-group">
          <label>
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "Anda harus menyetujui syarat dan ketentuan",
              })}
            />
            Saya setuju dengan Syarat & Ketentuan
          </label>
          <p className="error">{errors.agreeToTerms?.message}</p>
        </div>

        <button type="submit" className="full-width">
          Daftar
        </button>
      </form>
    </div>
  );
}