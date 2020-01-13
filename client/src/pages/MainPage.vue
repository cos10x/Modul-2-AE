<template>
  <q-page class="flex flex-center">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Shopping App</q-toolbar-title>

        <q-btn color="white" text-color="black" label="Add new product" @click="openAdd()" />
      </q-toolbar>
    </q-header>
    <q-dialog v-model="addProductOpen" transition-show="scale" transition-hide="scale">
      <q-card v-if="isCreate">
        <q-card-section class="row items-center">
          <div class="text-h6">Add new product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="q-pa-md">
          <q-card-section class="q-gutter-md" style="max-width: 300px">
            <q-input filled v-model="newProduct.name" label="Name" />

            <q-select filled v-model="newProduct.category" :options="categories" label="Category" />
            <q-input filled v-model="newProduct.quantity" label="Quantity" />
            <q-input filled v-model="newProduct.price" label="Price (RON)" />
          </q-card-section>
        </div>
        <q-card-actions class="bg-white text-teal flex flex-center">
          <q-btn color="primary" label="Add" @click="add" />
        </q-card-actions>
      </q-card>
      <q-card v-else>
        <q-card-section class="row items-center">
          <div class="text-h6">Edit product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="q-pa-md">
          <q-card-section class="q-gutter-md" style="max-width: 300px">
            <q-input filled v-model="selectedProduct.name" label="Name" />

            <q-select
              filled
              v-model="selectedProduct.category"
              :options="categories"
              label="Category"
            />
            <q-input filled v-model="selectedProduct.quantity" label="Quantity" />
            <q-input filled v-model="selectedProduct.price" label="Price (RON)" />
          </q-card-section>
        </div>
        <q-card-actions class="bg-white text-teal flex flex-center">
          <q-btn color="primary" label="Edit" @click="edit()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="container">
      <div class="full-width">
        <q-table
          title="Products"
          :data="data"
          responsive
          :columns="columns"
          row-key="id"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                @click="openEdit(props.row)"
                class="button"
                round
                color="primary"
                icon="create"
              />

              <q-btn @click="remove(props.row)" round color="black" icon="clear" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style>
.access .q-field {
  color: white;
}
.container {
  width: 90%;
}

.button {
  margin-right: 10px;
}
.full-width .enter.q-btn {
  width: 100%;
  margin-top: 20px;
}

.q-input {
  width: 100%;
}
</style>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      addProductOpen: false,
      categories: ["Phones", "Laptops", "Audio", "Video", "Periferics"],
      isCreate: true,
      filter: "",
      selectedProduct: {
        id: 0,
        name: "",
        category: "",
        quantity: 0,
        price: 0
      },
      newProduct: {
        name: "",
        category: "",
        quantity: 0,
        price: 0
      },
      columns: [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "category",
          align: "left",
          label: "Category",
          field: "category",
          sortable: true
        },
        {
          name: "quantity",
          label: "Quantity",
          field: "quantity",
          format: val => `${val} buc.`,
          sortable: true
        },
        {
          name: "price",
          label: "Price",
          field: "price",
          format: val => `${val} RON`,
          sortable: true
        },
        {
          name: "actions",
          label: "Action"
        }
      ],

      data: []
    };
  },
  methods: {
    add() {
      this.$axios
        .post("/api/products", this.newProduct)
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
          this.loadData();
          this.addProductOpen = false;
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    edit() {
      this.$axios
        .put(`/api/products/${this.selectedProduct.id}`, this.selectedProduct)
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
          this.loadData();
          this.addProductOpen = false;
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    openAdd() {
      this.addProductOpen = true;
      this.isCreate = true;
    },

    loadData() {
      this.$axios
        .get("/api/products")
        .then(response => {
          this.data = response.data;
          this.$q.notify({
            color: "teal",
            message: "Data loaded",
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },

    openEdit(element) {
      this.isCreate = false;

      this.addProductOpen = true;
      this.selectedProduct = { ...element };
    },
    remove(element) {
      this.$axios
        .delete(`/api/products/${element.id}`)
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
          this.loadData();
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
