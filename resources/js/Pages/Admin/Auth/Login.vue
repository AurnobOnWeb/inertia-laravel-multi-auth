<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route("admin.login"), {
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div
            class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1"
        >
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <img
                        src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                        class="w-mx-auto"
                    />
                </div>
                <div class="mt-12 flex flex-col items-center">
                    <Head title="Admin Log in" />

                    <div
                        v-if="status"
                        class="mb-4 font-medium text-sm text-green-600"
                    >
                        {{ status }}
                    </div>

                    <form @submit.prevent="submit">
                        <div class="w-full flex-1 mt-8">
                            <div class="my-12 border-b text-center">
                                <div
                                    class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                                >
                                    sign In with Cartesian E-mail
                                </div>
                            </div>

                            <div class="mx-auto max-w-xs">
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="email"
                                    type="email"
                                    v-model="form.email"
                                    required
                                    autofocus
                                    autocomplete="username"
                                    placeholder="Email"
                                />
                                <InputError
                                    class="mt-2"
                                    :message="form.errors.email"
                                />
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    id="password"
                                    type="password"
                                    v-model="form.password"
                                    required
                                    autocomplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError
                                    class="mt-2"
                                    :message="form.errors.password"
                                />
                                <button
                                    class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    <svg
                                        class="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                                        />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span class="ml-"> Sign In </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="flex-1 bg-green-100 text-center hidden lg:flex">
                <div
                    class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="
                        background-image: url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz');
                    "
                ></div>
            </div>
        </div>
    </div>
</template>
