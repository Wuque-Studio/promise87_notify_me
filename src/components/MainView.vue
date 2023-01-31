<template>
  <div style="text-align: center; margin: calc(2vh)">
    <n-h1> Promise87 Bespoke Edition Wishlist Form </n-h1>
  </div>
  <div style="display: flex">
    <n-card
      title="Notify me"
      size="large"
      hoverable="true"
      :bordered="false"
      style="margin: calc(2vh) calc(15vw) 0px calc(15vw)"
    >
      <n-form ref="formRef" :model="info" :rules="rules">
        <n-form-item path="name" label="Name">
          <n-input
            v-model:value="info.name"
            @keydown.enter.prevent
            placeholder="Please input your name"
          />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input
            v-model:value="info.email"
            type="email"
            placeholder="Please input your email"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="discord" label="Discord Handle">
          <n-input
            v-model:value="info.discord"
            @keydown.enter.prevent
            placeholder="Please input your discord"
          />
        </n-form-item>
        <n-form-item path="country" label="Country">
          <n-input
            v-model:value="info.country"
            @keydown.enter.prevent
            placeholder="Please input your country"
          />
        </n-form-item>

        <div style="text-align: center">
          <n-button
            :disabled="
              info.name === '' ||
              info.country === '' ||
              info.discord === '' ||
              info.email === '' ||
              info.name === null ||
              info.country === null ||
              info.discord === null ||
              info.email === null ||
              !info.email.includes('@')
            "
            round
            type="primary"
            size="large"
            attr-type="submit"
            @click="signinClick"
            style="margin: 4px 2px; padding: 20px 50px"
          >
            Notify me
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useInfoStore } from "@/stores/info";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import axios from "axios";

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const info = useInfoStore();

const signinClick = (e: MouseEvent) => {
  console.log(info.$state);

  e.preventDefault();
  formRef.value?.validate(async () => {
    try {
      await axios
        .post("https://120.79.0.147/api/notify", info.$state, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          message.success("Success");
        });
    } catch (e: any) {
      message.error("Fail: " + e.response!.data.message);
    }
  });
};

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty name");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  discord: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty discord");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  country: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty country");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value.includes("@")) {
          return new Error("incorrect email");
        }
        return true;
      },
      trigger: "input",
    },
  ],
};
</script>

<style scoped></style>
