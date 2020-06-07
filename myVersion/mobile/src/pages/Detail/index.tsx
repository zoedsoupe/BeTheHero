import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import logo from "../../assets/logo.png";

import styles from "./styles";

interface Response {
  title: string;
  _id: string;
  value: number;
  ongName: string;
  ongEmail: string;
  ongWpp: string;
  ongCity: string;
  ongUf: string;
}

const Incidents = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params as Response;

  const message = `Olá ${
    incident.ongName
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de  ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.ongEmail],
      body: message,
    });
  }

  function sendWpp() {
    Linking.openURL(`whatsapp://send?phone=${incident.ongWpp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={(styles.incidentProperty, { marginTop: 0 })}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.ongName} de {incident.ongCity}/{incident.ongUf}
        </Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroTitleDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWpp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Incidents;
