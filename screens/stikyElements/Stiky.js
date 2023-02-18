import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import {icons} from '../../constants';
const {height, width} = Dimensions.get('screen');

const paragraph = [
  'Le bassin sédimentaire sénégalais constitue un segment du bassin sénégalo-mauritano-guinéen, vaste bassin côtier de marge continentale passive. Ce bassin sédimentaire est limité à l’est et au sud-est par la chaîne des Mauritanides et au sud, par le Bassin de Bové. Long de 1 300 km, dans son extension maximale (Mauritanie-Guinée-Bissau), ce bassin atteint une largeur maximale d’environ 550 km à la latitude de Dakar.',
  'Appuyé sur le Craton ouest-africain, le bassin côtier accumule une puissante série sédimentaire, d’origine principalement marine, qui débute au Trias-Lias et se termine au Miocène. Depuis la limite orientale du bassin, proche de Bakel, les dépôts s’épaississent vers l’ouest, d’abord progressivement, puis, passant une flexure localisée entre 15°30’W et 16°30’W (Spengler et al., 19667 ; Latil-Brun et Flicoteaux, 19868), leur épaisseur augmente rapidement, pour atteindre, à Dakar, des épaisseurs de plus de 6 000 mètres à 7 000 mètres (Castelain, 19659 ; Spengler et al., 1966). En Casamance, les profondeurs estimées dépasseraient huit mille mètres.',

  "Malgré le caractère apparemment subhorizontal des couches, les données de l'exploration pétrolière indiquent une forte structuration et une importante compartimentation des dépôts, dont le Horst de Diass donne un aperçu. Au Sénégal, la série du Mésozoïque-Cénozoïque affleurante se limite aux niveaux stratigraphiques les plus supérieurs, n’interceptant les roches d'âge Campanien que très marginalement alors que le Maastrichtien est mieux exposé dans le Horst de Diass, malgré la présence d’une puissante cuirasse latéritique.",
  "Les séries cénozoïques sont plus largement représentées à l’affleurement, exposées dans les falaises de la presqu'île du Cap-Vert et aussi dans la falaise à l’ouest et au sud de Thiès et marginalement dans le Sine, où elles sont surtout connues en puits. Les plus beaux affleurements se localisent à la marge passive atlantique. Au cœur du bassin, la série sédimentaire est masquée par la cuirasse latéritique fini-Tertiaire et, vers le nord-ouest, par les dépôts de sédiments éoliens quaternaires. Dans cette région centrale et orientale, les seuls affleurements tertiaires connus sont limités aux rives du lac de Guiers et à la haute vallée du fleuve Sénégal, dans la région de Matam, les grès du « Continental terminal » (renommé Formation du Saloum en 2009) venant largement sceller et masquer la série marine du Paléogène. En Casamance, il est connu, en forage, que la série marine monte jusque dans le Miocène.",
  "Du volcanisme du Miocène apparaît régionalement dispersé dans la presqu’île du Cap-Vert et la région de Thiès ; il est représenté par des laves et des tufs coiffés par la cuirasse ferrugineuse latéritique d'âge fini-Pliocène (Crévola, 199410). Le volcanisme quaternaire, polyphasé, est restreint à la pointe de la presqu’île du Cap-Vert.",

  'De récentes cartes géologiques du Sénégal (2009) ont été élaborées dans le cadre de la Coopération Sénégal – Union européenne, suivant les procédures du neuvième Fonds européen de Développement (FED) pour le compte de la Direction des Mines et de la Géologie (DMG) et existent aux échelles de 1/500 000 pour les trois quarts du territoire et de 1/200 000 le long du fleuve Sénégal',
  'De récentes cartes géologiques du Sénégal (2009) ont été élaborées dans le cadre de la Coopération Sénégal – Union européenne, suivant les procédures du neuvième Fonds européen de Développement (FED) pour le compte de la Direction des Mines et de la Géologie (DMG) et existent aux échelles de 1/500 000 pour les trois quarts du territoire et de 1/200 000 le long du fleuve Sénégal',
  'De récentes cartes géologiques du Sénégal (2009) ont été élaborées dans le cadre de la Coopération Sénégal – Union européenne, suivant les procédures du neuvième Fonds européen de Développement (FED) pour le compte de la Direction des Mines et de la Géologie (DMG) et existent aux échelles de 1/500 000 pour les trois quarts du territoire et de 1/200 000 le long du fleuve Sénégal',
  "Les séries cénozoïques sont plus largement représentées à l’affleurement, exposées dans les falaises de la presqu'île du Cap-Vert et aussi dans la falaise à l’ouest et au sud de Thiès et marginalement dans le Sine, où elles sont surtout connues en puits. Les plus beaux affleurements se localisent à la marge passive atlantique. Au cœur du bassin, la série sédimentaire est masquée par la cuirasse latéritique fini-Tertiaire et, vers le nord-ouest, par les dépôts de sédiments éoliens quaternaires. Dans cette région centrale et orientale, les seuls affleurements tertiaires connus sont limités aux rives du lac de Guiers et à la haute vallée du fleuve Sénégal, dans la région de Matam, les grès du « Continental terminal » (renommé Formation du Saloum en 2009) venant largement sceller et masquer la série marine du Paléogène. En Casamance, il est connu, en forage, que la série marine monte jusque dans le Miocène.",
];

const getImage = i =>
  `https://source.unsplash.com/600x${400 + i}/?blackandwhite `;
let title = 'Black and White';
const Stiky = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [bottomActions, setBottomActions] = useState(null);
  const topEdge = bottomActions?.y - height + bottomActions?.height;
const inputRange = [-1, 0, topEdge - 1,topEdge, topEdge + 1]
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
      }}>
      <StatusBar hidden />
      <Text
        style={{
          fontSize: 489 / title.length,
          textAlign: 'center',
          fontWeight: '800',
          textTransform: 'uppercase',
        }}>
        {title}
      </Text>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}>
        {paragraph.map((text, index) => (
          <View key={index}>
            {index % 3 === 0 && (
              <Image
                style={{
                  height: 220,
                  width,
                }}
                source={{uri: getImage(index)}}
              />
            )}
            <Text
              style={{
                margin: 10,
                textAlign: 'justify',
                fontSize: 15,
                color: 'grey',
              }}>
              {text}
            </Text>
          </View>
        ))}
        <View
          onLayout={ev => {
            setBottomActions(ev.nativeEvent.layout);
          }}
          style={{
            height: 80,
            backgroundColor: 'teal',
            marginBottom: 10,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: '#000',
              textTransform: 'capitalize',
            }}>
            Featured :
          </Text>
          {paragraph.slice(0, 3).map((text, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: getImage(index)}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                    resizeMode: 'cover',
                    marginRight: 10,
                  }}
                />
                <Text
                  numberOfLines={3}
                  style={{
                    marginBottom: 5,
                    marginRight: 20,
                  }}>
                  {text}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
     {bottomActions && <Animated.View
        style={{
          padding: 10,
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          backgroundColor: "white",
          bottom: 0,
          right: 0,
          left: 0,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0,0, -1],
              }),
            },
          ],

        }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Animated.Image
            source={icons.airplane}
            style={{
              width: 20,
              height: 20,
              tintColor: '#000',
              marginRight: 10,
              opacity: scrollY.interpolate({
                
                    inputRange,
                    outputRange: [0,0,0,1,1]
                
              })
            }}
          />
          <Animated.Image
            source={icons.bed}
            style={{
              width: 20,
              height: 20,
              tintColor: '#000',

              transform:[
                {
                    translateX: scrollY.interpolate({
                        inputRange,
                        outputRange: [60,60,60,0,0]
                    })
                }
              ]
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Animated.Image
            source={icons.compass}
            style={{
              width: 20,
              height: 20,
              tintColor: 'blue',

              opacity: scrollY.interpolate({
                
                inputRange,
                outputRange: [0,0,0,1,1]
            
          })
            }}
          />
          <Animated.Image
            source={icons.eat}
            style={{
              width: 20,
              height: 20,
              tintColor: 'green',
              marginHorizontal: 25,

              opacity: scrollY.interpolate({
                
                inputRange,
                outputRange: [0,0,0,1,1]
            
          })
            }}
          />
          <Animated.Image
            source={icons.event}
            style={{
              width: 20,
              height: 20,
              tintColor: 'tomato',

              transform: [{
                translateX: scrollY.interpolate({
                    inputRange,
                    outputRange: [-10,-10,-10,0,0]
                })
              }]
            }}
          />
        </View>
      </Animated.View>
}
    </View>
  );
};

export default Stiky;
