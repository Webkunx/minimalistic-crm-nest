import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async addProductToOrder(
    product: Product,
    quantity: number,
  ): Promise<Product> {
    const newQuantity = product.quantity - quantity;
    if (newQuantity < 0)
      throw new BadRequestException(
        `We don't have ${quantity} of ${product.name} on our storage, we have only ${product.quantity}`,
      );
    product.quantity = newQuantity;
    await product.save();
    return product;
  }
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, quantity, price } = createProductDto;
    const product = new Product();

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    await product.save();
    return product;
  }

  async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, quantity, price } = updateProductDto;

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    await product.save();
    return product;
  }
}
