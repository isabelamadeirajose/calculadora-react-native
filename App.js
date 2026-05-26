import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Text, Surface, Provider as PaperProvider } from 'react-native-paper';

function Botao({ label, onPress, mode = 'outlined' }) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={styles.botao}
      labelStyle={styles.botaoLabel}
    >
      {label}
    </Button>
  );
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [primeiroValor, setPrimeiroValor] = useState('');
  const [operador, setOperador] = useState('');
  const [esperandoSegundo, setEsperandoSegundo] = useState(false);

  const handleNumero = (num) => {
    if (esperandoSegundo) {
      setDisplay(String(num));
      setEsperandoSegundo(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + String(num));
    }
  };

  const handleOperador = (op) => {
    setPrimeiroValor(display);
    setOperador(op);
    setEsperandoSegundo(true);
  };

  const handleIgual = () => {
    if (!primeiroValor || !operador) return;
    const a = parseFloat(primeiroValor);
    const b = parseFloat(display);
    let resultado;
    switch (operador) {
      case '+': resultado = a + b; break;
      case '-': resultado = a - b; break;
      case '*': resultado = a * b; break;
      case '/': resultado = b !== 0 ? a / b : 'Erro'; break;
      default: return;
    }
    setDisplay(String(resultado));
    setPrimeiroValor('');
    setOperador('');
    setEsperandoSegundo(false);
  };

  const handleLimpar = () => {
    setDisplay('0');
    setPrimeiroValor('');
    setOperador('');
    setEsperandoSegundo(false);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Surface style={styles.display} elevation={4}>
          <Text style={styles.displayText}>{display}</Text>
        </Surface>

        <View style={styles.linha}>
          <Botao label="7" onPress={() => handleNumero('7')} />
          <Botao label="8" onPress={() => handleNumero('8')} />
          <Botao label="9" onPress={() => handleNumero('9')} />
          <Botao label="/" onPress={() => handleOperador('/')} mode="contained" />
        </View>

        <View style={styles.linha}>
          <Botao label="4" onPress={() => handleNumero('4')} />
          <Botao label="5" onPress={() => handleNumero('5')} />
          <Botao label="6" onPress={() => handleNumero('6')} />
          <Botao label="*" onPress={() => handleOperador('*')} mode="contained" />
        </View>

        <View style={styles.linha}>
          <Botao label="1" onPress={() => handleNumero('1')} />
          <Botao label="2" onPress={() => handleNumero('2')} />
          <Botao label="3" onPress={() => handleNumero('3')} />
          <Botao label="-" onPress={() => handleOperador('-')} mode="contained" />
        </View>

        <View style={styles.linha}>
          <Botao label="C" onPress={handleLimpar} mode="contained" />
          <Botao label="0" onPress={() => handleNumero('0')} />
          <Botao label="=" onPress={handleIgual} mode="contained" />
          <Botao label="+" onPress={() => handleOperador('+')} mode="contained" />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  display: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  },
  displayText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  botao: {
    flex: 1,
    margin: 4,
  },
  botaoLabel: {
    fontSize: 22,
  },
});