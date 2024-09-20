import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { H4, Paragraph, XStack, YStack } from "tamagui";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: { rating: number; comment: string; date: string; reviewerName: string; reviewerEmail: string }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string };
  images: string[];
  thumbnail: string;
};

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (!product) {
    return <Paragraph>Product not found!</Paragraph>;
  }

  return (
    <ScrollView>
      <YStack gap={"$4"} p={"$4"}>
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: "100%", height: 200 }}
        />
        <H4>{product.title}</H4>
        <Paragraph>{product.description}</Paragraph>
        <XStack gap={"$2"}>
          <Paragraph>${product.price.toFixed(2)}</Paragraph>
          <Paragraph>Rating: {product.rating}</Paragraph>
        </XStack>
        <Paragraph>Brand: {product.brand}</Paragraph>
        <Paragraph>SKU: {product.sku}</Paragraph>
        <Paragraph>Stock: {product.stock}</Paragraph>
        <Paragraph>Discount: {product.discountPercentage}%</Paragraph>
        <Paragraph>Weight: {product.weight}g</Paragraph>
        <Paragraph>Warranty: {product.warrantyInformation}</Paragraph>
        <Paragraph>Shipping: {product.shippingInformation}</Paragraph>
        <Paragraph>Status: {product.availabilityStatus}</Paragraph>
        <Paragraph>Return Policy: {product.returnPolicy}</Paragraph>
        <Paragraph>Minimum Order Quantity: {product.minimumOrderQuantity}</Paragraph>
        <H4>Tags:</H4>
        <XStack gap={"$2"}>
          {product.tags.map(tag => (
            <Paragraph key={tag}>#{tag}</Paragraph>
          ))}
        </XStack>
        <H4>Reviews:</H4>
        {product.reviews.map((review, index) => (
          <YStack key={index} gap={"$2"} mb={"$2"}>
            <Paragraph>Rating: {review.rating}</Paragraph>
            <Paragraph>{review.comment}</Paragraph>
            <Paragraph>- {review.reviewerName}</Paragraph>
          </YStack>
        ))}
        <H4>Product Images:</H4>
        <XStack gap={"$2"} flexWrap="wrap">
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
          ))}
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default ProductDetailsScreen;