# Q&A

## 📱 Sobre o Projeto

Q&A é um aplicativo móvel desenvolvido com React Native e Expo, focado em fornecer uma experiência educacional interativa e personalizada.

## 🏗️ Arquitetura do Projeto

### Arquitetura Baseada em Features

O projeto segue uma arquitetura baseada em features, onde cada funcionalidade é autocontida e independente. Esta abordagem traz vários benefícios:

- **Modularidade**: Cada feature pode ser desenvolvida e testada isoladamente
- **Manutenibilidade**: Código relacionado está agrupado logicamente
- **Escalabilidade**: Novas features podem ser adicionadas sem afetar as existentes
- **Colaboração**: Diferentes equipes podem trabalhar em features distintas

### Estrutura de uma Feature

Cada feature segue uma estrutura padronizada:

```
feature/
├── components/     # Componentes específicos da feature
├── hooks/         # Custom hooks da feature
├── store/         # Estado local da feature (quando necessário)
└── index.tsx      # Ponto de entrada da feature
```

### Estrutura de Diretórios

```
meu-guru/
├── app/                    # Rotas e navegação (Expo Router)
│   ├── (tabs)/            # Navegação por tabs
│   └── question/          # Rotas relacionadas a questões
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── config/           # Configurações do app
│   ├── constants/        # Constantes e enums
│   ├── features/         # Funcionalidades específicas
│   │   ├── favorites/    # Gerenciamento de favoritos
│   │   │   ├── components/    # Componentes específicos de favoritos
│   │   │   ├── hooks/        # Hooks para lógica de favoritos
│   │   │   └── index.tsx     # Componente principal
│   │   ├── history/      # Histórico de questões
│   │   │   ├── components/    # Componentes do histórico
│   │   │   ├── hooks/        # Hooks para lógica do histórico
│   │   │   └── index.tsx     # Componente principal
│   │   ├── home/         # Tela principal
│   │   │   ├── components/    # Componentes da home
│   │   │   ├── hooks/        # Hooks da home
│   │   │   ├── store/        # Estado local da home
│   │   │   └── index.tsx     # Componente principal
│   │   └── question-details/ # Detalhes das questões
│   │       ├── components/    # Componentes de detalhes
│   │       ├── hooks/        # Hooks para lógica de detalhes
│   │       └── index.tsx     # Componente principal
│   ├── hooks/ 
│   │   └── useImageHandler.tsx # Hook global, utilizado para tratamento de imagens 
│   │   └── useSelectionMode.tsx # Hook global, utilizado para função "selecionar todos" de uma lista
│   │   └── useSpeechRecognition.tsx # Hook global, utilizado para captura e detecção de voz
│   ├── services/         # Serviços e APIs
│   │   ├── api/         # Configuração e integração com APIs
│   │   └── storage/     # Gerenciamento de armazenamento local
│   ├── stores/           # Gerenciamento de estado (Zustand)
│   ├── theme/            # Tema e estilização
│   └── types/            # Definições de tipos TypeScript
├── assets/               # Recursos estáticos
│   ├── fonts/           # Fontes personalizadas
│   └── images/          # Imagens e ícones
└── .expo/               # Configurações do Expo
```

## 🛠️ Tecnologias Principais

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **TypeScript**: Tipagem estática
- **Zustand**: Gerenciamento de estado
- **Expo Router**: Navegação
- **React Native Reanimated**: Animações
- **@shopify/restyle**: Sistema de design
- **Axios**: Cliente HTTP
- **Reactotron**: Debugging e monitoramento

## 📋 Requisitos

### Requisitos do Sistema
- Node.js
- npm ou yarn
- Expo CLI
- iOS Simulator (para desenvolvimento iOS)
- Android Studio (para desenvolvimento Android)

### Dependências Principais
- React Native 0.79.2
- Expo SDK 53
- React 19.0.0
- TypeScript 5.8.3

## 🎯 Features Principais

### 1. Sistema de Favoritos
- Armazenamento local de questões favoritas
- Interface intuitiva para gerenciamento
- Sincronização com o estado global

### 2. Histórico de Questões
- Registro de questões visualizadas
- Navegação rápida entre questões recentes
- Persistência de dados

### 3. Detalhes de Questões
- Visualização detalhada de questões
- Suporte a fórmulas matemáticas (LaTeX)
- Interface responsiva e interativa

### 4. Tema e Estilização
- Sistema de design consistente
- Componentes reutilizáveis

## 🚀 Desafios e Soluções

### 1. Performance e Otimização
- **Desafio**: Garantir performance fluida em diferentes dispositivos
- **Solução**: 
  - Uso de React Native Reanimated para animações otimizadas
  - Implementação de lazy loading
  - Otimização de renderização de listas

### 2. Gerenciamento de Estado
- **Desafio**: Manter o estado da aplicação consistente e previsível
- **Solução**: 
  - Implementação do Zustand para gerenciamento de estado
  - Separação clara de responsabilidades entre stores
  - Persistência de dados com AsyncStorage

### 3. Navegação
- **Desafio**: Criar uma experiência de navegação fluida e intuitiva
- **Solução**: 
  - Uso do Expo Router para navegação declarativa
  - Implementação de navegação por tabs
  - Gestos e transições suaves

### 4. UI/UX
- **Desafio**: Manter consistência visual e experiência do usuário
- **Solução**: 
  - Sistema de design com @shopify/restyle
  - Componentes reutilizáveis
  - Tema consistente em toda a aplicação

### 5. Renderização de Fórmulas Matemáticas
- **Desafio**: Exibir fórmulas matemáticas complexas em LaTeX
- **Solução**: 
  - Implementação de react-native-latex para renderização de LaTeX
  - Suporte a react-native-math-view para fórmulas matemáticas
  - Tipagem personalizada para garantir compatibilidade TypeScript
  - Otimização de performance na renderização de fórmulas complexas

## 🛠️ Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run android`: Inicia o app no Android
- `npm run ios`: Inicia o app no iOS
- `npm run web`: Inicia o app na web
- `npm run lint`: Executa o linter
- `npm run reset-project`: Reseta o projeto

## 📱 Executando o App

### Desenvolvimento com Expo Go (Mais Simples)
1. Instale o app Expo Go no seu dispositivo:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Execute `npm start` no terminal
3. Escaneie o QR code com:
   - iOS: Câmera do iPhone
   - Android: App Expo Go

### Desenvolvimento com Build Nativo

#### iOS
1. Certifique-se de ter o Xcode instalado
2. Execute `npm run ios`
3. No Xcode:
   - Selecione seu projeto no navegador
   - Selecione o target
   - Vá em "Signing & Capabilities"
   - Marque "Automatically manage signing"
   - Selecione seu time de desenvolvimento (Apple ID)

#### Android
1. Certifique-se de ter o Android Studio instalado
2. Configure uma variável de ambiente ANDROID_HOME
3. Execute `npm run android`
   - O build de debug será assinado automaticamente
   - Não é necessário configuração adicional para desenvolvimento

### Solução de Problemas Comuns

#### iOS
- Se encontrar problemas de assinatura, verifique se:
  - Você tem uma conta Apple Developer
  - O Xcode está atualizado
  - O bundle identifier está correto no app.json

#### Android
- Se encontrar problemas de build, verifique se:
  - O Android SDK está instalado corretamente
  - As variáveis de ambiente estão configuradas
  - O emulador está rodando ou um dispositivo está conectado

### Limitações de Funcionalidades

#### Funcionalidades de Voz
- O reconhecimento de voz e funcionalidades relacionadas ao microfone **só funcionam em dispositivos físicos**
- Emuladores e simuladores podem não suportar estas funcionalidades corretamente
- Para testar recursos de voz, use um dispositivo físico com:
  - iOS: Permissões de microfone habilitadas
  - Android: Permissões de RECORD_AUDIO concedidas

## 🔒 Segurança

- Implementação de autenticação segura
- Armazenamento seguro de dados sensíveis
- Proteção contra vulnerabilidades comuns
- Validação de dados em tempo real

## 📱 Compatibilidade

- iOS 13.0+
- Android 6.0+
