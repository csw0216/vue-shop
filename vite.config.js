import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'], // 确保vue基础API自动导入
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix:'i',
        }),

       
      ],
      dts: './auto-imports.d.ts', // 生成类型声明文件
      // dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
       // dirs 指定组件所在位置，默认为 src/components
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        dirs: ['src/components/'],
        // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
        extensions: ['vue'],
        // 解析组件，这里以 Element Plus 为例
       resolvers: [
        ElementPlusResolver(),
        
        
       IconsResolver({
         enabledCollections: ['ep'],// element-plus图标集标识
         alias: { 'ep': 'element-plus' } // 集合别名
        }),
      ],
       // 生成components.d.ts
        dts: 'src/components.d.ts'

      // dts: path.resolve(
      // 
      // pathSrc, 'components.d.ts'),
    }),

    Icons({ compiler: 'vue3', defaultClass: 'inline-block', autoInstall: true }),
    //  Inspect()

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

