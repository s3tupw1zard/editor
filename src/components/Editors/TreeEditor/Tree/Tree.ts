import { set } from '@vue/composition-api'
import { v4 as uuid } from 'uuid'
import type { ArrayTree } from './ArrayTree'
import type { ObjectTree } from './ObjectTree'
export type TPrimitiveTree = string | number | boolean | null
export type TTree = TPrimitiveTree | Object | Array<unknown>

export const treeElementHeight = 19

export abstract class Tree<T> {
	public readonly uuid = uuid()
	public abstract readonly component: Vue.Component
	public isSelected: boolean = false
	public abstract type: TTree
	public abstract height: number
	protected abstract _value: T
	abstract toJSON(): T

	get styles() {
		return {
			contentVisibility: 'auto',
			containIntrinsicSize: `${this.height}px`,
		}
	}

	constructor(protected parent: ObjectTree | ArrayTree | null) {}

	get value() {
		return this._value
	}
	getParent() {
		return this.parent
	}

	get key(): string | number {
		if (!this.parent)
			throw new Error(`Trees without parent do not have a key`)

		if (this.parent.type === 'array') {
			const index = this.parent.children.findIndex(
				(currentTree) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)

			return index
		} else {
			const index = this.parent.children.findIndex(
				([_, currentTree]) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)

			return this.parent.children[index][0]
		}
	}

	replace(tree: Tree<unknown>) {
		if (!this.parent) throw new Error(`Cannot replace tree without parent`)

		let index: number
		if (this.parent.type === 'array') {
			index = this.parent.children.findIndex(
				(currentTree) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)
		} else {
			index = this.parent.children.findIndex(
				([_, currentTree]) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)
		}

		set(
			this.parent.children,
			index,
			this.parent.type === 'array' ? tree : [this.key, tree]
		)
	}

	delete() {
		if (!this.parent) throw new Error(`Cannot delete tree without parent`)

		let index: number
		if (this.parent.type === 'array') {
			index = this.parent.children.findIndex(
				(currentTree) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)
		} else {
			index = this.parent.children.findIndex(
				([_, currentTree]) => currentTree === this
			)

			if (index === -1)
				throw new Error(
					`Invalid state: TreeChild with parent couldn't be found inside of parent's children`
				)
		}

		this.parent.children.splice(index, 1)
	}
}
