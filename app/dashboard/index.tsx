import ScreenWrapper from "@/components/ScreenWrapper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  H4,
  H5,
  ListItem,
  Paragraph,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  category:string;
};

const DashboardScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products); // Assuming data.products contains the array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <XStack alignItems="center" gap={"$1"}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <AntDesign key={`full-${index}`} name="star" size={16} color="gold" />
        ))}
        {halfStar && <AntDesign name="staro" size={16} color="gold" />}
        {Array.from({ length: totalStars - fullStars - (halfStar ? 1 : 0) }).map(
          (_, index) => (
            <AntDesign key={`empty-${index}`} name="staro" size={16} color="gold" />
          )
        )}
      </XStack>
    );
  };

  return (
    <ScreenWrapper
      header={
        <>
          <View flexDirection="row" gap={"$2"}>
            <H4>
              <AntDesign name="home" size={24} />
            </H4>
            <H4>Home</H4>
          </View>
        </>
      }
    >
      <View p={"$4"}>
        {loading ? (
          <Paragraph>Loading...</Paragraph>
        ) : (
          <YStack gap={"$2"}>
            <H5>Product List</H5>
            <YGroup gap={"$3"}>
              {products.map((product) => (
                <YGroup.Item key={product.id}>
                  <TouchableOpacity
                     onPress={() =>
                      navigation.navigate('product-details/[id]', { id: product.id }) // Updated
                    }
                  >
                    <ListItem
                      hoverTheme
                      pressTheme
                      title={
                        <XStack alignItems="center" gap={"$2"}>
                          <Image
                            source={{ uri: product.thumbnail }}
                            style={{ width: 60, height: 60 }} 
                          />
                          <H4>{product.title}</H4>
                          <Paragraph>${product.price}</Paragraph>
                        </XStack>
                      }
                      subTitle={
                        <>
                          <XStack alignItems="center" marginLeft={"$10"} gap={"$2"}>
                          <Paragraph>{product.category}</Paragraph>
                            {renderStars(product.rating)}
                            <Paragraph>({product.rating})</Paragraph>
                          </XStack>
                        </>
                      }
                    />
                  </TouchableOpacity>
                </YGroup.Item>
              ))}
            </YGroup>
          </YStack>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default DashboardScreen;