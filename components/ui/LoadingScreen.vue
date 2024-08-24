<template>
    <div class="loading-screen">
        <div class="flex flex-col items-center justify-center">
            <img src="@/assets/branding/Pojokoding-wordmark.svg" class="mb-4" data-cy="loading-text">
            <UiOrbitLoading></UiOrbitLoading>
        </div>
    </div>
</template>

<style>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
</style>
