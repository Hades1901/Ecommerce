import {
  Arg,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Product } from "../Entities/Product";
import { checkAuth } from "../Middleware/CheckAuth";
import { ProductMutationResponse } from "../Type/ErrorValidate/ProductMutationResponse";
import { ProductInput } from "../Type/Input/ProductInput";
import { UpdatePostInput } from "../Type/Input/UpdatePostInput";

@Resolver()
export class ProductResolver {
  @Mutation((_return) => ProductMutationResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async createProduct(
    @Arg("createProductInput") { name, description, price }: ProductInput
  ): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOneBy({ name });

      if (existingProduct) {
        return {
          code: 400,
          success: false,
          error: [{ field: "name", message: "This product already exist" }],
        };
      }

      const newProduct = Product.create({
        name,
        description,
        price,
      });

      await newProduct.save();

      return {
        code: 200,
        success: true,
        message: "Product created successfully",
        product: newProduct,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: err.message,
      };
    }
  }

  @Query((_type) => [Product])
  async getProducts(): Promise<Product[]> {
    return Product.find();
  }

  @Query((_type) => [Product])
  @UseMiddleware(checkAuth)
  async deleteAllProduct(): Promise<Product[] | null> {
    await Product.clear();
    return Product.find();
  }

  @Query((_type) => ProductMutationResponse)
  @UseMiddleware(checkAuth)
  async deleteOneProduct(
    @Arg("id", (_type) => ID) id: number
  ): Promise<ProductMutationResponse> {
    const post = await Product.findOneBy({ id });

    if (!post)
      return {
        code: 400,
        success: false,
        message: "Post not found ",
      };

    await Product.delete({ id });

    return {
      code: 200,
      success: true,
      message: "Product was deleted",
    };
  }

  @Query((_type) => ProductMutationResponse)
  async getOneProduct(
    @Arg("id", (_type) => ID) id: number
  ): Promise<ProductMutationResponse> {
    const post = await Product.findOneBy({ id });
    if (!post)
      return {
        code: 400,
        success: false,
        message: "Post not found or was deleted",
      };
    return {
      code: 200,
      success: true,
      product: post,
    };
  }

  @Mutation((_type) => ProductMutationResponse)
  @UseMiddleware(checkAuth)
  async updateProduct(
    @Arg("updatePostInput") { id, name, description, price }: UpdatePostInput
  ): Promise<ProductMutationResponse> {
    const post = await Product.findOneBy({ id });

    if (!post)
      return {
        code: 400,
        success: false,
        message: "Product not found",
      };

    post.name = name;
    post.description = description;
    post.price = price;

    await post.save();

    return {
      code: 200,
      success: true,
      message: "Product was update",
      product: post,
    };
  }
}
