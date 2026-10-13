
import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ========================================
// 1. SUPABASE CONFIGURATION
// ========================================

// Replace these with your actual Supabase project details.
const SUPABASE_URL = "https://hxobruqpmzehpxzzgtxw.supabase.co";
const SUPABASE_KEY = "sb_publishable_jFwwSCs_ukv7jmVd-ZnnFw_2roi5rLF";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);

// ========================================
// 2. REGISTER A NEW USER
// ========================================

export async function registerUser({
    fullName,
    businessName,
    phone,
    email,
    password
}) {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
            data: {
                full_name: fullName.trim(),
                business_name: businessName?.trim() || "",
                phone: phone?.trim() || ""
            },
            emailRedirectTo: window.location.origin + "/login.html"
        }
    });

    if (error) throw error;

    return {
        user: data.user,
        session: data.session,
        needsEmailConfirmation: !data.session
    };
}

// ========================================
// 3. LOG IN
// ========================================

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
    });

    if (error) throw error;

    return data;
}

// ========================================
// 4. LOG OUT
// ========================================

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return true;
}

// ========================================
// 5. GET CURRENT AUTHENTICATED USER
// ========================================

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
}

// ========================================
// 6. CHECK WHETHER A SESSION EXISTS
// ========================================

export async function getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session;
}

// ========================================
// 7. LISTEN FOR AUTHENTICATION CHANGES
// ========================================

export function onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange(
        (event, session) => {
            callback(event, session);
        }
    );

    return data.subscription;
}

// ========================================
// 8. GET THE LOGGED-IN USER'S PROFILE
// ========================================

export async function getUserProfile() {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("You must log in to view your profile.");
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, business_name, phone, created_at")
        .eq("id", user.id)
        .maybeSingle();

    if (error) throw error;

    return data;
}
