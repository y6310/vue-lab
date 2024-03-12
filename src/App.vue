<script setup>
import { ref,onMounted } from 'vue'
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const items = ref([]);

onMounted(async () => {
  onSnapshot(collection(db, "products"), (querySnapshot) => {
    const newItems = [];
    querySnapshot.forEach((doc) => {
      const newItem = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        price: doc.data().price,
        image: doc.data().image,
        soldOut: doc.data().soldOut,
        selected: doc.data().selected,
      }
      newItems.push(newItem);
    });
    items.value = newItems;
  });
});

const nameInput = ref("");
const descriptionInput = ref("");
const priceInput = ref("");
const imageInput = ref("");

  // 商品を追加する関数（addProduct function）を実装
  function addProduct() {
    // 新しい商品データを作成
    const newItem = {
      id: items.value.length + 1,
      name: nameInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      image: imageInput.value,
      soldOut: false,
      selected: false,
    }
    addDoc(collection(db, "products"), newItem);
  }
</script>

<template>
  <header class="header">
    <img
      src="/images/logo.svg"
      alt="">
    <h1>Vue.js ハンズオン</h1>
  </header>
  <div class="main"> 
    <template v-for="item in items" :key="item.id">
      <div
        class="item"
        v-if="!item.soldOut"
        :class="{ 'selected-item': item.selected }"
        @click="item.selected = !item.selected"
      >
        <div class="thumbnail">
          <img :src="item.image" alt="" />
        </div>
        <div class="description">
          <h2>{{ item.name }}</h2>
          <p>
            {{ item.description }}
          </p>
          <span
            >¥<span class="price">{{ item.price }}</span></span
          >
        </div>
      </div>
    </template>
  </div> 


  <div>商品名</div>
  <input type="text" v-model="nameInput" />
  <div>商品説明</div>
  <input type="text" v-model="descriptionInput" />
  <div>価格</div>
  <input type="number" v-model="priceInput" />
  <div>商品画像</div>
  <input type="text" v-model="imageInput" />
  <button @click="addProduct()">追加</button>

</template>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 90%;
  margin: 0 5%;
  color: #242424;
}

.header {
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.header > img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.header > h1 {
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 0;
  margin-bottom: 0;
}

.main {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr;
  column-gap: 24px;
  row-gap: 24px;
}

.item {
  padding: 10px;
  cursor: pointer;
}

.item:hover {
  transition: 0.2s transform ease-out;
  transform: scale(1.05);
}

.item > div.thumbnail > img {
  width: 100%;
  height: calc(100%);
  object-fit: cover;
}

.item > div.description {
  text-align: left;
  margin-top: 20px;
}

.item > div.description > p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 25px;
}

.item > div.description > span {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}

.item > div.description > span > .price {
  font-size: 28px;
  font-weight: bold;
}

.selected-item {
  background: #e3f2fd;
}
</style>