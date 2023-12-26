<script>
import { ref, onMounted } from "vue";
import SideBar from "@/Pages/Admin/Layouts/SideBar.vue";
import Header from "@/Pages/Admin/Layouts/Header.vue";
import Panelopen from "@/Pages/Admin/Component/Panelopen.vue";
export default {
    components: {
        SideBar,
        Header,
        Panelopen,
    },
    setup() {
        // Replace these with your actual chart instances or references
        const barChart = { data: { datasets: [] }, update: () => {} };
        const doughnutChart = {
            data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
            update: () => {},
        };
        const lineChart = {
            data: { datasets: [{ data: [] }] },
            update: () => {},
        };

        const isDark = ref(true);
        const color = ref("cyan");
        const selectedColor = ref("cyan");
        const isSidebarOpen = ref(false);
        const isSettingsPanelOpen = ref(false);
        const isNotificationsPanelOpen = ref(true);
        const isSearchPanelOpen = ref(false);
        const isMobileSubMenuOpen = ref(false);
        const isMobileMainMenuOpen = ref(false);

        const toggleTheme = () => {
            isDark.value = !isDark.value;
            setTheme(isDark.value);
        };

        const setLightTheme = () => {
            isDark.value = false;
            setTheme(isDark.value);
        };

        const setDarkTheme = () => {
            isDark.value = true;
            setTheme(isDark.value);
        };

        const setColors = (color) => {
            const root = document.documentElement;
            root.style.setProperty("--color-primary", `var(--color-${color})`);
            root.style.setProperty(
                "--color-primary-50",
                `var(--color-${color}-50)`
            );
            root.style.setProperty(
                "--color-primary-100",
                `var(--color-${color}-100)`
            );
            root.style.setProperty(
                "--color-primary-light",
                `var(--color-${color}-light)`
            );
            root.style.setProperty(
                "--color-primary-lighter",
                `var(--color-${color}-lighter)`
            );
            root.style.setProperty(
                "--color-primary-dark",
                `var(--color-${color}-dark)`
            );
            root.style.setProperty(
                "--color-primary-darker",
                `var(--color-${color}-darker)`
            );
            selectedColor.value = color;
            window.localStorage.setItem("color", color);
        };

        const updateBarChart = (on) => {
            const data = {
                data: randomData(),
                backgroundColor: "rgb(207, 250, 254)",
            };
            if (on) {
                barChart.data.datasets.push(data);
                barChart.update();
            } else {
                barChart.data.datasets.splice(1);
                barChart.update();
            }
        };

        const updateDoughnutChart = (on) => {
            const data = random();
            const color = "rgb(207, 250, 254)";
            if (on) {
                doughnutChart.data.labels.unshift("Seb");
                doughnutChart.data.datasets[0].data.unshift(data);
                doughnutChart.data.datasets[0].backgroundColor.unshift(color);
                doughnutChart.update();
            } else {
                doughnutChart.data.labels.splice(0, 1);
                doughnutChart.data.datasets[0].data.splice(0, 1);
                doughnutChart.data.datasets[0].backgroundColor.splice(0, 1);
                doughnutChart.update();
            }
        };

        const updateLineChart = () => {
            lineChart.data.datasets[0].data.reverse();
            lineChart.update();
        };

        const openSettingsPanel = () => {
            isSettingsPanelOpen.value = true;
        };

        const notification = (data) => {
            isNotificationsPanelOpen.value = data;
        };

        const openSearchPanel = () => {
            isSearchPanelOpen.value = true;
        };

        const openMobileSubMenu = () => {
            isMobileSubMenuOpen.value = true;
        };

        const openMobileMainMenu = () => {
            isMobileMainMenuOpen.value = true;
        };

        onMounted(() => {
            // Your onMounted logic goes here
        });

        return {
            isDark,
            toggleTheme,
            setLightTheme,
            setDarkTheme,
            color,
            selectedColor,
            setColors,
            isSidebarOpen,
            toggleSidbarMenu: () => {
                isSidebarOpen.value = !isSidebarOpen.value;
            },
            isSettingsPanelOpen,
            openSettingsPanel,
            isNotificationsPanelOpen,
            notification,
            isSearchPanelOpen,
            openSearchPanel,
            isMobileSubMenuOpen,
            openMobileSubMenu,
            isMobileMainMenuOpen,
            openMobileMainMenu,
            updateBarChart,
            updateDoughnutChart,
            updateLineChart,
        };
    },
};
</script>
<template>
    <div :class="{ dark: isDark }">
        <div
            class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
        >
            <!-- Loading screen -->

            <!-- Sidebar -->
            <SideBar> </SideBar>
            <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
                <!-- Navbar -->

                <Header @notification="notification"></Header>
                <!-- Main content -->
                <main>
                    <slot></slot>
                </main>

                <!-- Main footer -->
                <footer
                    class="flex items-center justify-between p-4 bg-white border-t dark:bg-darker dark:border-primary-darker"
                >
                    <div>K-WD &copy; 2021</div>
                    <div>
                        Made by
                        <a
                            href="https://github.com/Kamona-WD"
                            target="_blank"
                            class="text-blue-500 hover:underline"
                            >Ahmed Kamel</a
                        >
                    </div>
                </footer>
            </div>

            <!-- Panels -->

            <!-- Settings Panel -->
            <!-- Backdrop -->
            <div
                x-transition:enter="transition duration-300 ease-in-out"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition duration-300 ease-in-out"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                v-if="isSettingsPanelOpen"
                @click="isSettingsPanelOpen = false"
                class="fixed inset-0 z-10 bg-primary-darker"
                style="opacity: 0.5"
                aria-hidden="true"
            ></div>
            <!-- Panel -->
            <section
                x-transition:enter="transition duration-300 ease-in-out transform sm:duration-500"
                x-transition:enter-start="translate-x-full"
                x-transition:enter-end="translate-x-0"
                x-transition:leave="transition duration-300 ease-in-out transform sm:duration-500"
                x-transition:leave-start="translate-x-0"
                x-transition:leave-end="translate-x-full"
                x-ref="settingsPanel"
                tabindex="-1"
                v-if="isSettingsPanelOpen"
                @keydown.escape="isSettingsPanelOpen = false"
                class="fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-white shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none"
                aria-labelledby="settinsPanelLabel"
            >
                <div class="absolute left-0 p-2 transform -translate-x-full">
                    <!-- Close button -->
                    <button
                        @click="isSettingsPanelOpen = false"
                        class="p-2 text-white rounded-md focus:outline-none focus:ring"
                    >
                        <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <!-- Panel content -->
                <div class="flex flex-col h-screen">
                    <!-- Panel header -->
                    <div
                        class="flex flex-col items-center justify-center flex-shrink-0 px-4 py-8 space-y-4 border-b dark:border-primary-dark"
                    >
                        <span
                            aria-hidden="true"
                            class="text-gray-500 dark:text-primary"
                        >
                            <svg
                                class="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </span>
                        <h2
                            id="settinsPanelLabel"
                            class="text-xl font-medium text-gray-500 dark:text-light"
                        >
                            Settings
                        </h2>
                    </div>
                    <!-- Content -->
                    <div class="flex-1 overflow-hidden hover:overflow-y-auto">
                        <!-- Theme -->
                        <div class="p-4 space-y-4 md:p-8">
                            <h6
                                class="text-lg font-medium text-gray-400 dark:text-light"
                            >
                                Mode
                            </h6>
                            <div class="flex items-center space-x-8">
                                <!-- Light button -->
                                <button
                                    @click="setLightTheme"
                                    class="flex items-center justify-center px-4 py-2 space-x-4 transition-colors border rounded-md hover:text-gray-900 hover:border-gray-900 dark:border-primary dark:hover:text-primary-100 dark:hover:border-primary-light focus:outline-none focus:ring focus:ring-primary-lighter focus:ring-offset-2 dark:focus:ring-offset-dark dark:focus:ring-primary-dark"
                                    :class="{
                                        'border-gray-900 text-gray-900 dark:border-primary-light dark:text-primary-100':
                                            !isDark,
                                        'text-gray-500 dark:text-primary-light':
                                            isDark,
                                    }"
                                >
                                    <span>
                                        <svg
                                            class="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Light</span>
                                </button>

                                <!-- Dark button -->
                                <button
                                    @click="setDarkTheme"
                                    class="flex items-center justify-center px-4 py-2 space-x-4 transition-colors border rounded-md hover:text-gray-900 hover:border-gray-900 dark:border-primary dark:hover:text-primary-100 dark:hover:border-primary-light focus:outline-none focus:ring focus:ring-primary-lighter focus:ring-offset-2 dark:focus:ring-offset-dark dark:focus:ring-primary-dark"
                                    :class="{
                                        'border-gray-900 text-gray-900 dark:border-primary-light dark:text-primary-100':
                                            isDark,
                                        'text-gray-500 dark:text-primary-light':
                                            !isDark,
                                    }"
                                >
                                    <span>
                                        <svg
                                            class="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Dark</span>
                                </button>
                            </div>
                        </div>

                        <!-- Colors -->
                        <div class="p-4 space-y-4 md:p-8">
                            <h6
                                class="text-lg font-medium text-gray-400 dark:text-light"
                            >
                                Colors
                            </h6>
                            <div>
                                <button
                                    @click="setColors('cyan')"
                                    class="w-10 h-10 rounded-full"
                                    style="background-color: var(--color-cyan)"
                                ></button>
                                <button
                                    @click="setColors('teal')"
                                    class="w-10 h-10 rounded-full"
                                    style="background-color: var(--color-teal)"
                                ></button>
                                <button
                                    @click="setColors('green')"
                                    class="w-10 h-10 rounded-full"
                                    style="background-color: var(--color-green)"
                                ></button>
                                <button
                                    @click="setColors('fuchsia')"
                                    class="w-10 h-10 rounded-full"
                                    style="
                                        background-color: var(--color-fuchsia);
                                    "
                                ></button>
                                <button
                                    @click="setColors('blue')"
                                    class="w-10 h-10 rounded-full"
                                    style="background-color: var(--color-blue)"
                                ></button>
                                <button
                                    @click="setColors('violet')"
                                    class="w-10 h-10 rounded-full"
                                    style="
                                        background-color: var(--color-violet);
                                    "
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Panel -->
            <Panelopen> </Panelopen>
            <!-- Search panel -->
            <!-- Backdrop -->
            <div
                x-transition:enter="transition duration-300 ease-in-out"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition duration-300 ease-in-out"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                v-if="isSearchPanelOpen"
                @click="isSearchPanelOpen = false"
                class="fixed inset-0 z-10 bg-primary-darker"
                style="opacity: 0.5"
                aria-hidden="ture"
            ></div>
            <!-- Panel -->
            <section
                x-transition:enter="transition duration-300 ease-in-out transform sm:duration-500"
                x-transition:enter-start="-translate-x-full"
                x-transition:enter-end="translate-x-0"
                x-transition:leave="transition duration-300 ease-in-out transform sm:duration-500"
                x-transition:leave-start="translate-x-0"
                x-transition:leave-end="-translate-x-full"
                v-if="isSearchPanelOpen"
                @keydown.escape="isSearchPanelOpen = false"
                class="fixed inset-y-0 z-20 w-full max-w-xs bg-white shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none"
            >
                <div class="absolute right-0 p-2 transform translate-x-full">
                    <!-- Close button -->
                    <button
                        @click="isSearchPanelOpen = false"
                        class="p-2 text-white rounded-md focus:outline-none focus:ring"
                    >
                        <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <h2 class="sr-only">Search panel</h2>
                <!-- Panel content -->
                <div class="flex flex-col h-screen">
                    <!-- Panel header (Search input) -->
                    <div
                        class="relative flex-shrink-0 px-4 py-8 text-gray-400 border-b dark:border-primary-darker dark:focus-within:text-light focus-within:text-gray-700"
                    >
                        <span
                            class="absolute inset-y-0 inline-flex items-center px-4"
                        >
                            <svg
                                class="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </span>
                        <input
                            x-ref="searchInput"
                            type="text"
                            class="w-full py-2 pl-10 pr-4 border rounded-full dark:bg-dark dark:border-transparent dark:text-light focus:outline-none focus:ring"
                            placeholder="Search..."
                        />
                    </div>

                    <!-- Panel content (Search result) -->
                    <div
                        class="flex-1 px-4 pb-4 space-y-4 overflow-y-hidden h hover:overflow-y-auto"
                    >
                        <h3
                            class="py-2 text-sm font-semibold text-gray-600 dark:text-light"
                        >
                            History
                        </h3>
                        <a href="#" class="flex space-x-4">
                            <div class="flex-shrink-0">
                                <img
                                    class="w-10 h-10 rounded-lg"
                                    src="build/images/cover.jpg"
                                    alt="Post cover"
                                />
                            </div>
                            <div class="flex-1 max-w-xs overflow-hidden">
                                <h4
                                    class="text-sm font-semibold text-gray-600 dark:text-light"
                                >
                                    Header
                                </h4>
                                <p
                                    class="text-sm font-normal text-gray-400 truncate dark:text-primary-lighter"
                                >
                                    Lorem ipsum dolor, sit amet consectetur.
                                </p>
                                <span
                                    class="text-sm font-normal text-gray-400 dark:text-primary-light"
                                >
                                    Post
                                </span>
                            </div>
                        </a>
                        <a href="#" class="flex space-x-4">
                            <div class="flex-shrink-0">
                                <img
                                    class="w-10 h-10 rounded-lg"
                                    src="build/images/avatar.jpg"
                                    alt="Ahmed Kamel"
                                />
                            </div>
                            <div class="flex-1 max-w-xs overflow-hidden">
                                <h4
                                    class="text-sm font-semibold text-gray-600 dark:text-light"
                                >
                                    Ahmed Kamel
                                </h4>
                                <p
                                    class="text-sm font-normal text-gray-400 truncate dark:text-primary-lighter"
                                >
                                    Last activity 3h ago.
                                </p>
                                <span
                                    class="text-sm font-normal text-gray-400 dark:text-primary-light"
                                >
                                    Offline
                                </span>
                            </div>
                        </a>
                        <a href="#" class="flex space-x-4">
                            <div class="flex-shrink-0">
                                <img
                                    class="w-10 h-10 rounded-lg"
                                    src="build/images/cover-2.jpg"
                                    alt="K-WD Dashboard"
                                />
                            </div>
                            <div class="flex-1 max-w-xs overflow-hidden">
                                <h4
                                    class="text-sm font-semibold text-gray-600 dark:text-light"
                                >
                                    K-WD Dashboard
                                </h4>
                                <p
                                    class="text-sm font-normal text-gray-400 truncate dark:text-primary-lighter"
                                >
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit.
                                </p>
                                <span
                                    class="text-sm font-normal text-gray-400 dark:text-primary-light"
                                >
                                    Updated 3h ago.
                                </span>
                            </div>
                        </a>
                        <template x-for="i in 10" x-key="i">
                            <a href="#" class="flex space-x-4">
                                <div class="flex-shrink-0">
                                    <img
                                        class="w-10 h-10 rounded-lg"
                                        src="build/images/cover-3.jpg"
                                        alt="K-WD Dashboard"
                                    />
                                </div>
                                <div class="flex-1 max-w-xs overflow-hidden">
                                    <h4
                                        class="text-sm font-semibold text-gray-600 dark:text-light"
                                    >
                                        K-WD Dashboard
                                    </h4>
                                    <p
                                        class="text-sm font-normal text-gray-400 truncate dark:text-primary-lighter"
                                    >
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                    <span
                                        class="text-sm font-normal text-gray-400 dark:text-primary-light"
                                    >
                                        Updated 3h ago.
                                    </span>
                                </div>
                            </a>
                        </template>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style>
.slide-fade-enter-from {
    transform: translateX(
        30px
    ); /* Change this to a positive value to move in from the left */
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(
        -20px
    ); /* Change this to a negative value to move out to the left */
    opacity: 0;
}
</style>
