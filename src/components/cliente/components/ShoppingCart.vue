<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.name }} - {{ item.price }}
        </li>
        </ul>
    </div>
</template>