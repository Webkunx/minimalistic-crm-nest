import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import {
  NotFoundException,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { Product } from "./product.interface";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  private logger = new Logger("ProductRepository");
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, quantity, price } = createProductDto;
    const product = new ProductEntity();

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    try {
      await this.save(product);
    } catch (e) {
      this.logger.error(
        `Failed to create product with data: ${(JSON.stringify(
          createProductDto,
        ),
        e.stack)}`,
      );
      throw new InternalServerErrorException();
    }
    return product;
  }

  async addProductToOrder(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException("product with this id doesnt exists");
    }
    const newQuantity = product.quantity - quantity;
    if (newQuantity < 0) {
      throw new BadRequestException(
        "dont have so much of this product at our storage",
      );
    }
    product.quantity = newQuantity;
    await this.save(product);
    const productAddedToOrder = product;
    productAddedToOrder.quantity = quantity;
    return productAddedToOrder;
  }

  async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, quantity, price } = updateProductDto;

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    try {
      await this.save(product);
    } catch (e) {
      this.logger.error(
        `Failed to update a product with data: ${updateProductDto}`,
        e.stack,
      );
      throw new InternalServerErrorException();
    }
    return product;
  }
}
