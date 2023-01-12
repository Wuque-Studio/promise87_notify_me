<template>
  <div style="display: flex">
    <n-card
      title="Notify me"
      size="large"
      hoverable="true"
      :bordered="false"
      style="margin: calc(15vh) calc(15vw) 0px calc(15vw)"
    >
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="username" label="Name">
          <n-input
            v-model:value="model.username"
            @keydown.enter.prevent
            placeholder="Please input your name"
          />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input
            v-model:value="model.email"
            type="email"
            placeholder="Please input your email"
            @keydown.enter.prevent
          />
        </n-form-item>
        <div style="text-align: center">
          <n-button
            :disabled="
              model.username === '' ||
              model.email === '' ||
              model.username === null ||
              model.email === null ||
              !model.email.includes('@')
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
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import axios from "axios";

interface ModelType {
  username: string | null;
  email: string | null;
}

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const model = ref<ModelType>({
  username: null,
  email: null,
});

const signinClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async () => {
    try {
      await axios
        .post("http://120.79.0.147:80/api/auth/signin", model.value, {
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
  username: [
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
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (value.length < 6) {
          return new Error("incorrect email");
        }
      },
      trigger: "input",
    },
  ],
};
</script>

<style scoped></style>
