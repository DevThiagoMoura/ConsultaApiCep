import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView } from "react-native";
import styles from "../styles/CepStyles";

export default function ConsultaCep() {
  const [cep, setCep] = useState(""); // CEP digitado
  const [cepParaBuscar, setCepParaBuscar] = useState(""); // CEP confirmado pelo botão
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const regexCep = /^\d{5}-?\d{3}$/;

  function handleCepChange(texto) {
    const apenasNumeros = texto.replace(/\D/g, "");
    let cepFormatado = apenasNumeros;
    if (apenasNumeros.length > 5) {
      cepFormatado = apenasNumeros.slice(0, 5) + "-" + apenasNumeros.slice(5, 8);
    }
    setCep(cepFormatado);
  }

  useEffect(() => {
    if (!cepParaBuscar) return;

    const cepLimpo = cepParaBuscar.replace("-", "");

    async function buscarCep() {
      setLoading(true);
      setErro("");
      setEndereco(null);

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();

        if (data.erro) {
          setErro("CEP não encontrado!");
        } else {
          setEndereco(data);
        }
      } catch (e) {
        setErro("Erro ao buscar o CEP. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    buscarCep();
  }, [cepParaBuscar]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        maxLength={9}
        value={cep}
        onChangeText={handleCepChange}
      />

      <Button
        title="Buscar"
        onPress={() => {
          if (!regexCep.test(cep)) {
            setErro("Digite um CEP válido (ex: 12345-678).");
            setEndereco(null);
            return;
          }
          setCepParaBuscar(cep); // dispara o useEffect
        }}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      {/* Exibe os resultados em cards separados */}
      {endereco && (
        <View style={styles.resultContainer}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>CEP:</Text>
            <Text style={styles.cardText}>{endereco.cep}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Logradouro:</Text>
            <Text style={styles.cardText}>{endereco.logradouro}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Bairro:</Text>
            <Text style={styles.cardText}>{endereco.bairro}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Cidade:</Text>
            <Text style={styles.cardText}>{endereco.localidade}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Estado:</Text>
            <Text style={styles.cardText}>{endereco.uf}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
